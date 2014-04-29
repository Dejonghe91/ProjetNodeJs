var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var winston = require('winston');
var model = require('../models/models.js');

describe('Routing Home', function() {

var url = 'localhost:3000';
var categorie = 'defaut';

  describe('Article List', function() {
      it('should retrieve the article list', function(done) {
        request(url)
          .get('/')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              res.should.have.status(200);
              done();
            });
      });
      
      it('should failed because of the POST verb', function(done) {
        var body = {
            titre: 'titre',
            content: 'content'
        };

        request(url)
          .post('/')
          .send(body)
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              res.should.have.status(405);
              done();
            });
      });

      it('should failed because of the PUT verb', function(done) {
        var body = {
            titre: 'titre',
            content: 'content'
        };

        request(url)
          .put('/')
          .send(body)
          .end(function(err, res) {
              if (err) {
                //throw err;
              }
              res.should.have.status(405);
              done();
            });
      });

      it('should failed because of the DELETE verb', function(done) {

        request(url)
          .del('/')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              res.should.have.status(405);
              done();
            });
      });
  });

});
