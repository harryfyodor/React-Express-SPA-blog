var jwt = require('jwt-simple')
var password = require('../data/user.js').password
// var articles = require('../data/articles.js').articles
// var tags = require('../data/articles.js').tags
var Post = require('../model/post.js')
var Comment = require('../model/comment.js')

var SECRET = "SECRET" 

// login
exports.login = function(req, res) {
  req.setMaxListeners(0)
  var payload = req.body
  if(payload.password === password) {
    console.log("Correct password") 
    var token = jwt.encode(payload, SECRET)
    res.json({ token: token })
  }
}

// check whether it is right
exports.check = function(req, res) {
  req.setMaxListeners(0)
  var token = req.body.token
  var decoded = jwt.decode(token, SECRET)
  if(decoded.password === password) {
    console.log("matched!")
    res.json({ match: true })
  } else {
    res.json({ match: false })
  }
}

function sendTitles(err, posts, res, count){
  if(err) {
    posts = []
  }
  res.send({
    articles: posts,
    ok: true,
    count: count
  })  
}

// home, archive, tagsResult, searchResult
exports.titles = function(req, res) {
  req.setMaxListeners(0)
  switch(req.body.type) {
    case "HOME":
      Post.getTen(req.body.page, function(err, posts, count) {
        sendTitles(err, posts, res, count)
      })
      break
    case "ARCHIVE":
      Post.getArchive(function(err, posts) {
        sendTitles(err, posts, res)
      })
      break
    case "TAGS":
      Post.getTag(req.body.tagName, function(err, posts) {
        sendTitles(err, posts, res)
      })
      break
    case "SEARCH":
      Post.search(req.body.searchString, function(err, posts) {
        sendTitles(err, posts, res)
      })
      break
    default:
      res.send({
        ok: false
      })
      break
  }
}

exports.tags = function(req, res) {
  req.setMaxListeners(0)
  Post.getTags(function(err, docs) {
    if(err) {
      docs = []
    } else {
      res.send({
        ok: true,
        tags: docs
      })
    }
  })
}

exports.upload = function(req, res) {
  req.setMaxListeners(0)
  var token = req.headers['authorization']
  if(!token) {
    // have no token
    res.sendStatus(401)
  } else {
    try {
      var decoded = jwt.decode(token.replace('Bearer ',''), SECRET)
      // the password is correct
      if(decoded.password === password) {
        // new article
        var article = req.body.article
        // articles.push(newArticle)
        var newArticle = new Post({
          title: article.title,
          tags: article.tags,
          description: article.description,
          content: article.content
        })
        newArticle.save(function(err) {
          if(err) {
            res.json({ok:false})
          } else {
            res.json({ok:true})
          }            
        })
      }
    } catch (e) {
      res.sendStatus(401)
    }
  }
}

exports.edit = function(req, res) {
  req.setMaxListeners(0)
  var token = req.headers['authorization']
  if(!token) {
    // have no token
    res.sendStatus(401)
  } else {
    try {
      var decoded = jwt.decode(token.replace('Bearer ',''), SECRET)
      // the password is correct
      if(decoded.password === password) {
        // edit article
        var article = req.body.article
        // articles.push(newArticle)
        var newArticle = {
          title: article.title,
          tags: article.tags,
          description: article.description,
          content: article.content
        }
        Post.edit(req.body.oldDay, req.body.oldTitle, newArticle, function(err) {
          if(err) {
            res.send({
              ok: false
            })
          } else {
            res.send({
              ok: true
            })
          }
        })
      }
    } catch (e) {
      res.sendStatus(401)
    }
  }
}

exports.single = function(req, res) {
  req.setMaxListeners(0)
  var day = req.body.day
  var title = req.body.title
  Post.getOne(day, title, function(err, article) {
    if(err) {
      res.send({
        ok: false
      })
    } else {
      res.send({
        ok: true,
        article: article
      })
    }
  })
}

exports.remove = function(req, res) {
  req.setMaxListeners(0)
  var day = req.body.day
  var title = req.body.title
  Post.remove(day, title, function(err) {
    if(err) {
      res.send({ok: false})
    } else {
      res.send({ok: true})      
    }
  })
}

exports.addComment = function(req, res) {
  req.setMaxListeners(0)
  var articleTitle = req.body.articleTitle
  var articleDay = req.body.articleDay
  var newComment = new Comment({
    name: req.body.comment.name,
    email: req.body.comment.email,
    comment: req.body.comment.comment,
    website: req.body.comment.website,
    admin: req.body.comment.admin
  })
  newComment.save(articleTitle, articleDay, function(err) {
    if(err) {
      res.send({
        ok: false
      })
    } else {
      res.send({
        ok: true
      })
    }
  })
}