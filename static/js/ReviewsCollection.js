 var ReviewsCollection = Backbone.Collection.extend({
    model: Review,
    urlRoot: '/api/reviews',
    url: function () {
    	var origUrl = this.urlRoot;

    	return origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/') + this.product;
    },

     comparator: function(item) {
      return item.get("id")
    },

    initialize: function(product) {
    	this.product = product;
    }

});

