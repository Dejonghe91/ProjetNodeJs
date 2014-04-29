/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var model = require('./models/models.js');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '../public')));
app.use(app.router);

// List of categories ressource
app.get('/', routes.getAllArticle);
app.put('/', routes.methodNotAllowed);
app.post('/', routes.methodNotAllowed);
app.delete('/', routes.methodNotAllowed);

// Article ressource
app.get('/:article', routes.getArticle);
app.put('/:article', routes.setArticle);
app.post('/:article', routes.createArticle);
app.delete('/:article', routes.deleteArticle);

//List of comments ressources
app.get('/:article/comments', routes.getComments);
app.put('/:article/comments', routes.methodNotAllowed);
app.post('/:article/comments', routes.addComment);
app.delete('/:article/comments', routes.methodNotAllowed);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
