var environment = process.env.NODE_ENV
var webpack = require('webpack')
var bodyParser = require('body-parser')
var path = require('path')
var port = 3000
var app = new (require('express'))()
var router = require('./routes/index')

var config

if(environment === 'production') {
  config = require('./webpack.config')
} else if (environment === 'development') {
  config = require('./webpack.config.dev')
} else {
  console.log('Please define NODE_ENV first\nlinux & mac: export NODE_ENV=production(or development)\nwindows: set NODE_ENV=production(or development\n)')    
}

var compiler = webpack(config)

if(environment === 'development') {
  var webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackHotMiddleware(compiler))
}
var webpackDevMiddleware = require('webpack-dev-middleware')
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))

// body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post("/api/login", router.login)
app.post("/api/check", router.check)
app.post("/api/titles", router.titles)
app.post("/api/tags", router.tags)
app.post("/api/upload", router.upload)
app.post("/api/single", router.single)
app.post("/api/edit", router.edit)
app.post("/api/remove", router.remove)
app.post("/api/comment", router.addComment)

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})