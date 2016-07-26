var mongodb = require('./db')

function Comment({
  admin: admin,
  name: name,
  email: email,
  comment: comment,
  website: website
}) {
  this.admin = admin
  this.name = name
  this.email = email
  this.comment = comment
  this.website = website
}

Comment.prototype.save = function(articleTitle, articleDay, callback) {
  var date = new Date()
  var minute = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  var comment = {
    name: this.name,
    email: this.email,
    comment: this.comment,
    website: this.website,
    minute: minute,
    admin: this.admin
  }
  mongodb.open(function(err, db) {
    if(err) return callback(err)
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close()
        return callback(err)
      }
      collection.update({
        "title": articleTitle,
        "time.day": articleDay
      }, {
        $push: { "comments":comment }
      }, function(err) {
        mongodb.close()
        if(err) return callback(err)
        return callback(null)
      })
    })
  })
}

module.exports = Comment