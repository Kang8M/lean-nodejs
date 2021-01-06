var express = require('express');
var fs = require('fs');
var path = require('path');

module.exports = (parent, options) => {
  var dir = path.join(__dirname, '..', 'controllers');
  var verbose = options.verbose;

  fs.readdirSync(dir).forEach((name) => {
    var file = path.join(dir, name)
    if (!fs.statSync(file).isDirectory()) return;
    verbose && console.log('\n %s:', name);
    var obj = require(file);
    var name = obj.name || name;
    var app = express()

    app.set('views', path.join(__dirname, '..', 'views', name))

    // mount the app
    parent.use(app);
  })
}