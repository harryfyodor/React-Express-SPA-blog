var mongodb = require('./db.js')

function Post ({
  title: title, 
  description: description, 
  content: content, 
  tags: tags
}) {
  this.title = title
  this.description = description
  this.content = content
  this.tags = tags
}

Post.prototype = {
  // save a post
  save: function(callback) {
    var date = new Date();
    var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };
    var post = {
      title: this.title,
      time: time,
      tags: this.tags,
      description: this.description,
      content: this.content,
      comments: []
    }
    // open db
    mongodb.open(function(err, db) {
      if(err) return callback(err)
      // open posts
      db.collection('posts', function(err, collection) {
        if(err) {
          mongodb.close()
          return callback(err)
        }
        // store the post
        collection.insert(post, {
          safe: true
        }, function(err) {
          mongodb.close();
          if(err) return callback(err)
          return callback(null)
        })
      })
    })
  }
}

Post.getTen = function(page, callback) {
  // open db
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    // open posts
    db.collection('posts', function (err, collection) {
      if(err) {
      mongodb.close()
        return callback(err)
      }
      collection.count({}, function(err, count) {
        collection.find({}, {
          "title": 1,
          "description": 1,
          "time": 1,
          "tags": 1,
          skip: (page - 1)*10,
          limit: 10
        }).sort({
          time: -1
        }).toArray(function(err, docs) {
          mongodb.close()
          if(err) return callback(err)
          return callback(null,docs,count)
        })  
      })
    })
  })
}

Post.getTags = function(callback) {
  mongodb.open(function(err, db) {
    if (err) return callback(err)
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err)
      }
      collection.distinct('tags', function(err, docs) {
        mongodb.close()
        if (err) return callback(err)
        return callback(null, docs)
      })
    })
  })
}

Post.getArchive = function(callback) {
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close()
        return callback(err)
      }
      collection.find({}, {
        "time": 1,
        "title": 1
      }).sort({
        time: -1
      }).toArray(function(err, docs) {
        mongodb.close()
        if(err) return callback(err)
        return callback(null, docs)
      })
    })
  })
}

Post.getTag = function(tagName, callback) {
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close()
        return callback(err)
      }
      collection.find({
        "tags": tagName
      }, {
        "title": 1,
        "time": 1
      }).sort({
        "time": -1
      }).toArray(function(err, docs) {
        mongodb.close()
        if(err) return callback(err)
        return callback(null, docs)
      })
    })
  })
}

Post.search = function(keyword, callback) {
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close()
        return callback(err)
      }
      var pattern = new RegExp(keyword, "i")
      collection.find({
        "title": pattern
      }, {
        "title": 1,
        "time": 1
      }).sort({
        "time": -1
      }).toArray(function(err, docs) {
        mongodb.close();
        if(err) return callback(err)
        return callback(null, docs)
      })
    })
  })
}

Post.getOne = function(day, title, callback) {
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection){
      if(err) {
        mongodb.close()
        return callback(err)
      }
      collection.findOne({
        "time.day": day,
        "title": title
      }, function(err, doc) {
        mongodb.close()
        if(err) {
          return callback(err)
        }
        return callback(null, doc)
      })
    })
  })
}

Post.remove = function(day, title, callback) {
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close()
        return callback(err)
      }
      collection.findOne({
        "time.day": day,
        "title": title
      }, function(err, doc) {
        if(err) {
          mongodb.close()
          return callback(err)
        }
        collection.remove({
          "title": title,
          "time.day": day
        }, {
          w : 1
        }, function(err) {
          mongodb.close()
          if(err) return callback(err)
          return callback(null)
        })
      })
    })
  })
}

Post.edit = function(day, title, article, callback) {
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close()
        return callback(err)
      }
      collection.update({
        "title": title,
        "time.day": day
      }, {
        $set: {
          title: article.title,
          tags: article.tags,
          content: article.content,
          description: article.description
        }
      }, function(err) {
        mongodb.close()
        if(err) return callback(err)
        return callback(null)
      })
    })
  })
}

module.exports = Post
