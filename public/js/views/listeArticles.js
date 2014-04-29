window.ArticleListView = Backbone.View.extend({

    initialize: function () {
        console.log("initialize article view js");
    },

    render: function () {
        $(this.el).empty();
        if (_.isEmpty(this.model.models))
        {
            $(this.el).append("<p>Aucun articles dans la base de données</p>");
        } 
        else
        {
            _.each(this.model.models, function (article)
            {
                $(this.el).append(new ArticleListItemView({ model: article }).render().el);
            }, this);
        }

        return this;
    }
});

window.ArticleListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});