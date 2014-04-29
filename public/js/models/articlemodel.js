window.Article = Backbone.Model.extend({

	urlRoot: "/"+this.slug,

    idAttribute: "_id",

  	initialize: function (slug) {
        this.slug = slug;
    	console.log("initialize Article model");
  	},

    validateAll: function () {
        return {isValid: true};
    },

	defaults: {
        _id: null,
        titre: "titre",
        content: "contenu"
    },
	
	getTitre: function() {
        return this.get("titre");
    },
     
    getContent: function() {
        return this.get("content");
    }
});

window.ArticleCollection = Backbone.Collection.extend({

    model: Article,

    initialize: function(){
    	console.log("initialize Article Collection model");
    },

    url: "/"

});