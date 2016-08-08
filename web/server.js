var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = new express();
var port = 8080;

var compiler = webpack(config);
app.use(express.static(__dirname + '/'));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({
  	extended: false
}));
app.get('/home', function(req, res) {
  res.sendFile(__dirname + '/home.html');
})
app.get('/information', function(req, res) {
  res.sendFile(__dirname + '/everyday.html');
})
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/logs", function(req, res) {
  res.sendFile(__dirname + '/all_data.txt');
});

app.get("/data", function(req, res) {
  res.sendFile(__dirname + '/data.txt');
});

app.get("/write/:data/set", function(req, res) {
  var str = req.params.data;
  
  fs.readFile('./all_data.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data += str;  
    fs.writeFile("./all_data.txt", data, function(err) {
      if(err) {
          return console.log(err);
      }
      res.send({success: true});
      console.log("The file was saved!");
    });
  });
  // fs.writeFile("./all_data.txt", data, function(err) {
  //   if(err) {
  //       return console.log(err);
  //   }
  //   res.send({success: true});
  //   console.log("The file was saved!");
  // });
});
app.get("/fire", function(req, res) {
  fs.readFile('./fire.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var num = parseInt(data) + 1;
    console.log(num);
    fs.writeFile("./fire.txt", num, function(err) {
      if(err) {
          return console.log(err);
      }
      res.send({success: true});
      console.log("The file was saved!");
    });
  });
});
app.get('/spinker/get', function(req, res) {
  res.sendFile(__dirname + '/spinker.txt');
});
app.get('/fire/get', function(req, res) {
  res.sendFile(__dirname + '/fire.txt');
});
app.get("/spinker", function(req, res) {
  fs.readFile('./spinker.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var num = parseInt(data) + 1;
    console.log(num);
    fs.writeFile("./spinker.txt", num, function(err) {
      if(err) {
          return console.log(err);
      }
      res.send({success: true});
      console.log("The file was saved!");
    });
  });
});
app.get("/write", function(req, res) {
  fs.readFile('./all_data.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    fs.writeFile("./test.txt", data, function(err) {
      if(err) {
          return console.log(err);
      }
      res.send({success: true});
      console.log("The file was saved!");
    });
  });
});

app.get("/data", function(req, res) {
  res.sendFile(__dirname + '/data.txt');
})

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
