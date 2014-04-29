var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var model = require('../models/models.js');
var winston = require('winston');
 
describe('Routing Article', function() {

var url = 'localhost:3000';
var slug = 'defaut';

	describe('Article Item on PUT / POST / GET', function() {
		it('should create a new article', function(done) {
	        var body = {
	        	titre: 'titre',
	          	content: 'contenu de larticle'
	        };

	        request(url)
	          	.post('/' + slug)
	          	.send(body)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(201);
	              	done();
	            });
      	});

  		it('should retrieve the article Item', function(done) {
        	request(url)
          		.get('/'+ slug)
          		.end(function(err, res) {
              		if (err) {
                		throw err;
              		}
              		res.should.have.status(200);
              		done();
            	});
  		});

  		it('should failed to retrieve because the article Item dont exist', function(done) {
        	request(url)
          		.get('/'+ slug + 'test')
          		.end(function(err, res) {
              		if (err) {
                		throw err;
              		}
              		res.should.have.status(404);
              		done();
            	});
  		});
   	
      	it('should modify an article', function(done) {
	        var body = {
	        	titre: 'titre modif',
	          	content: 'super content'
	        };

	        request(url)
	          	.put('/' + slug)
	          	.send(body)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(200);
	              	done();
	            });
      	});

      	it('should raise an error because of the body content while create', function(done) {
	        var body = {
	          	titre: 'tata',
	          	contenu: 'super content du post'
	        };

	        request(url)
	          	.post('/' + slug)
	          	.send(body)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(400);
	              	done();
	            });
      	});

      	it('should raise an error because of the body content while update', function(done) {
	        var body = {
	          	titre: 'tata',
	          	contenu: 'super content du post'
	        };

	        request(url)
	          	.put('/' + slug)
	          	.send(body)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(400);
	              	done();
	            });
      	});
	});

	describe('Comments Item', function() {
		it('should create a new comment', function(done) {
	        var body = {
	        	email: 'titre',
	          	body: 'contenu de larticle'
	        };

	        request(url)
	          	.post('/' + slug + '/comments')
	          	.send(body)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(201);
	              	done();
	            });
      	});

      	it('should fail to create a new comment because article dont exist', function(done) {
	        var body = {
	        	email: 'titre',
	          	body: 'contenu de larticle'
	        };

	        request(url)
	          	.post('/ArticleExistePas/comments')
	          	.send(body)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(404);
	              	done();
	            });
      	});

      	it('should get all the comments of an article', function(done) {
	        request(url)
	          	.get('/' + slug + '/comments')
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(200);
	              	done();
	            });
      	});

      	it('should fail to get all the comments of an article because it doesnt exist', function(done) {
	        request(url)
	          	.get('/articleExistePas/comments')
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(404);
	              	done();
	            });
      	});
	});

	describe('Article Item on DELETE', function(){
  		it('should delete the article', function(done) {

	        request(url)
	          	.del('/' + slug)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(200);
	              	done();
	            });
      	});

      	it('should failed because the article already delete', function(done) {

	        request(url)
	          	.del('/' + slug)
	          	.end(function(err, res) {
	              	if (err) {
	                	throw err;
	              	}
	              	res.should.have.status(404);
	              	done();
	            });
      	});
	});
});
