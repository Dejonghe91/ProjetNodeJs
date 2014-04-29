window.ArticleView = Backbone.View.extend({

    initialize: function () {
        console.log("initialize article view js");
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click .save"   : "saveArticle",
        "click .delete" : "deleteArticle"
    },

    saveArticle: function () {
        var self = this;
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('article/' + model.id, false);
            },
            error: function () {
                console.log("error sur "+ model);
            }
        });
    },

    deleteArticle: function () {
        this.model.destroy({
            success: function () {
                alert('Article supprimé');
                window.history.back();
            }
        });
        return false;
    },
});