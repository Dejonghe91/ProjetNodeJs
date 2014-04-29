var models = require('../models/models.js');

//Pour les restrictions liés aux verbes HTTP
exports.methodNotAllowed = function(req, res) {
    res.send(405, 'Method not allowed');
};

//Permet de récuperer tous les articles
exports.getAllArticle = function (req, res) {
    models.Article.find(function (err, articles) {
        if (err) 
        {
            res.send(500, err);
        }
        else
        {
            res.send(200, articles);
        }
    });
};

//Permet de récuperer un article
exports.getArticle = function(req, res){
    var slug = req.params.article;
    
    models.Article.findById(slug, function(err, article) {
        if (err) 
        {
            res.send(500, err);
        }
        
        if (article === null) 
        {
            res.send(404, 'Article Not found');
        } 
        else 
        {
            res.send(200, article);
        }
    });
};

//Permet de cree un Article
exports.createArticle = function (req, res){

    //Vérification du corp de la requete
    if (!req.body.hasOwnProperty('titre'))
    {
        res.send(400, 'The "titre" parameter is required');
    }
    if (!req.body.hasOwnProperty('content'))
    {
        res.send(400, 'The "content" parameter is required');
    }

    var slug = req.params.article;
    
    models.Article.findById(slug, function (err, article)
    {
        if (err)
        {
            res.send(500, err);
        }

        if (article === null)
        {
            article = new models.Article(req.body);
            article._id = slug;
            article.save(function (err)
            {
                if (err)
                {
                    res.send(500, err);
                }
                else
                {
                    res.send(201, article);
                }
            });
        } 
        else
        {
            res.send(309,'Article Already Exist, User PUT methode to modify it');
        }
    });
};

//Permet de modifier un article
exports.setArticle = function (req, res){

    //vérification du corp de la requete
    if (!req.body.hasOwnProperty('titre'))
    {
        res.send(400, 'The "titre" parameter is required');
    }
    if (!req.body.hasOwnProperty('content'))
    {
        res.send(400, 'The "content" parameter is required');
    }

    var slug = req.params.article;
    
    models.Article.findById(slug, function (err, article)
    {
        if (err)
        {
            res.send(500, err);
        }

        if (article === null)
        {
            res.send(404, 'Article Not Found');   
        } 
        else
        {
            article.titre = req.body.titre;
            article.content = req.body.content;
            
            article.save(function (err)
            {
                if (err)
                {
                    res.send(500, err);
                }
                else
                {
                    res.send(200, article);
                }
            });
        }
    });
};

//Permet de supprimer un article
exports.deleteArticle = function(req, res){
    
    var slug = req.params.article;
    
    models.Article.findById(slug, function(err, article) {
        if (err) 
        {
            res.send(500, err);
        }
        
        if (article !== null) 
        {
            article.remove();
            res.send(200);
        } 
        else 
        {
            res.send(404, 'Article Not Found');
        }
    });
};

//Permet de récuperer tous les commentaires sur un article
exports.getComments = function (req, res) {

    var slug = req.params.article;
    
    models.Article.findById(slug, function(err, article) {
        if (err) 
        {
            res.send(500, err);
        }
        
        if (article === null) 
        {
            res.send(404, 'Article Not found');
        } 
        else 
        {
            res.send(200, article.comments);
        }
    });
};

//Permet d'ajouter un commentaire dans un article
exports.addComment = function(req, res) {

    //vérification du contenu du corp de la requete
    if (!req.body.hasOwnProperty('email')) {
        res.send(400, 'The "email" parameter is required');
    }
    if (!req.body.hasOwnProperty('body')) {
        res.send(400, 'The "body" parameter is required');
    }

    var slug = req.params.article;

    models.Article.findById(slug, function(err, article) {
        if (err)
        {
            res.send(500, err);
        }

        if (article === null) {
            res.send(404, 'Article not found');
        } 
        else 
        {
            var comment = {email: req.body.email, body: req.body.body};
            article.comments.push(comment);
            article.save(function(err) {
                if (err) {
                    res.send(500, err);
                }
                else {
                    res.send(201, comment);
                }
            });
        } 
    });
};
