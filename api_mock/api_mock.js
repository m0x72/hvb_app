var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
  next();
});

app.get('/', function (req, res) {
  res.send('Ello! Read mai source pls!');
});

app.use('/', express.static(__dirname + '/static'));

function genRoute(route, jName, method) {
  var pload = require('./json/'+jName+'.json');
  var m;
  switch(method) {
    case 'POST':
      app.post('/api/'+route, function (req, res) {
        res.json(pload);
      });
      break;
    case 'PUT':
      app.put('/api/'+route, function (req, res) {
        res.json(pload);
      });
      break;
    case 'DELETE': 
       app.delete('/api/'+route, function (req, res) {
        res.json(pload);
      });
      break;
    default: 
      app.get('/api/'+route, function (req, res) {
        res.json(pload);
      });
      break;
  }
/*  m('/api/'+route, function (req, res) {
    res.json(pload);
  });
*/
}

genRoute('login', 'login__post', 'POST');
genRoute('videos', 'videos');
genRoute('videos/id', 'videos-id');
genRoute('videos/categories', 'videos-categories');
genRoute('videos/self', 'videos-self');
genRoute('videos', 'videos__post', 'POST');
genRoute('users/self', 'users-self');
genRoute('users', 'users__post', 'POST');
genRoute('logout', 'logout__post', 'POST');
genRoute('users/self/password', 'users-self-password__post', 'POST');
genRoute('users/self', 'users-self__post', 'POST');
genRoute('users/self/image', 'users-self-image__post', 'POST');

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('api_mock listening at http:/%s%s', host, port);
});
