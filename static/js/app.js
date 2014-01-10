var AppView = Backbone.View.extend({
            el: "#myapp",

            initialize: function() {
            	var products = new ProductCollection();
                products.bind('sync', this.render, this);
                products.fetch();
            },

            select_product: function(model){
                this.details_view && this.details_view.remove();
                this.details_view = new ProductDetailsView({model: model});
//                this.details_view.model.collection.fetch_product_reviews(model);
                this.$el.find("#product-details").html(this.details_view.render().el);
            },

            render: function(collection) {
                for (var i = collection.models.length - 1; i >= 0; i--) {                    
                    var view = new ProductView({model: collection.models[i]});
                    view.on('select',this.select_product,this);
                    this.$el.find("#product-list").append(view.render().el);
                }
            }
});

var App;

(function() {
  var _sync = Backbone.sync;
  Backbone.sync = function(method, model, options){
    options.beforeSend = function(xhr){
      var token = $('meta[name="csrf-token"]').attr('content');
      xhr.setRequestHeader('X-CSRFToken', token);
    };
    return _sync(method, model, options);
  };
})();

$(function() {
	App = new AppView;
});