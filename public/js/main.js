window.Router = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "article/add"       : "addArticle",
        "article/:id"       : "articleDetails"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
    },

    home: function () {
        this.homeView = new HomeView();
        var articleList = new ArticleCollection();
        articleList.fetch({success: function(){
            console.log("OK");
            $("#content").html(new ArticleListView({model: articleList}).render().el);
        }});

        this.headerView.selectMenuItem('home-menu');
    },

    articleDetails: function (id) {
        var article = new Article({_id: id});
        article.fetch({success: function(){
            $("#content").html(new ArticleView({model: article}).render().el);
        }});

        this.headerView.selectMenuItem();
    },

	addArticle: function() {
        var article = new Article();
        $('#content').html(new ArticleView({model: article}).render().el);
        
        this.headerView.selectMenuItem('add-menu');
	}
});

templateLoader.load(["HeaderView", "ArticleListItemView", "ArticleView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });