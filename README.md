ProjetNodeJs
============

Projet Node.js de la matière E-Application du master AIGLE  
Pour executer le projet, mettre l'adresse du serveur mongodb dans le fichier api/models/models.js, lancer le serveur en entrant dans une console `node api/app.js&`. Le serveur écoute sur le port 3000. Pour lancer tous tests unitaires, entrez dans une console `cd api && make test`


Routes de l'API du blog
------------

## /
GET  
* status code 
    * 200
    * 500 si erreur serveur requete mongodb

renvoi tous les articles 

POST
* status code
    * 405 methode not allowed 

PUT
* status code
    * 405 methode not allowed 

DELETE
* status code
    * 405 methode not allowed 



## /:article

GET  
* status code 
    * 200 si slug :article existe  
    * 404 not found sinon
    * 500 si erreur serveur

renvoi le detail de l'article


POST
* status code
    * 201 si slug :article n'existe pas
    * 309 sinon
    * 400 si les parametres _titre_ et _content_ ne sont pas fournis
    * 500 si erreur serveur

cree un article et le renvoi
'{ "titre": "un_titre", "content": "contenu_article" }'


PUT  
* status code 
    * 200 si slug :article existe  
    * 404 not found sinon  
    * 400 si le parametre _titre_ et _content_ ne sont pas fournis  
    * 500 si erreur serveur

modifie l'article  et renvoi l'article  
`{ "titre": "titre_article", "content": "contenu_article" }`  


DELETE  
* status code 
    * 200 si slug :article existe  
    * 404 not found sinon  
    * 500 si erreur serveur

supprime l'article


## /:article/comments

GET
* status code
    * 200 si slug :article existe
    * 404 article not found sinon
    * 500 si erreur serveur

retourne la liste de tous les commentaire d'un article


POST
* status code
    * 201 si slug :article existe et parametres correctes
    * 404 si slug :article n'existe pas
    * 400 si les parametre _email_ et _body_ ne sont pas fournis
    * 500 si erreur serveur

cree un commentaire et le renvoi
`{ "email": "email_sender", "body": "contenu_commentaire" }`


PUT
* status code
    * 405 methode not allowed 


DELETE
* status code
    * 405 methode not allowed 
