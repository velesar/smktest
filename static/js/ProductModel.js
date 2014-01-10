var Product = Backbone.Model.extend({            
            urlRoot: '/api/products/',
            url: function () {
                var origUrl = Backbone.Model.prototype.url.call(this);
                return origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
            },
            defaults: function() {
              return {
                "img": "default.png", 
                "text": "default...", 
                "title": "unknown product"
              };
            },
            initialize: function() {
              if (!this.get("title")) {
                this.set({"title": this.defaults.title});
              }
            },
            get_reviews:function(collection){
                this.reviews = collection;
                this.trigger('reviews_arrived');
            },
            fetch_reviews: function(){
                this.reviews = new ReviewsCollection(this.get('id'));
                this.reviews.fetch({
                    success:_.bind(this.get_reviews,this)
                });
            }
});       