window.HomeView = Backbone.View.extend({

    initialize:function () {
        console.log('Initialize HomeView js');
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },
});