 var Review = Backbone.Model.extend({
    defaults: {
        text: '',
        rate: 0
    },

    urlRoot: '/api/reviews/',

    url: function () {
        var origUrl = Backbone.Model.prototype.url.call(this);
        return origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/') + this.get('product');
    }
});

