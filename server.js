var http = require('http')
var fs = require('fs')
var formidable = require('formidable')
var event = require('events')
var eventEmitter = new event.EventEmitter()

http.createServer((req, res) => {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm();

    form.uploadDir = 'uploads/'
    form.parse(req, (err, field, file) => {
      var path = file.files.path
      var newPath = form.uploadDir + file.files.name

      fs.rename(path, newPath, (err) => {
        if (err) throw err;
        res.end('Upload thanh cong!')
      })
    })
    return;
  }

  res.writeHead(200, {
    'content-type': 'text/html'
  })

  if (req.url === '/home') {
    eventEmitter.on('testing', (data) => {
      console.log(data);
    })

    eventEmitter.emit('testing', new Date())

    fs.readFile('home.html', 'utf8', (err, data) => {
      if (err) throw err;
      res.end(data);
    })
  } else {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) throw err;
      res.end(data);
    })
  }
  
}).listen(3000)