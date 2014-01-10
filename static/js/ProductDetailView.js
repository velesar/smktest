
var ProductDetailsView = Backbone.View.extend({
    tagName:  "div",
    template: '#product-detail',
    initialize: function() {
        this.template = _.template($(this.template).html());
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.model.on("reviews_arrived",this.render_reviews,this);
           this.render_reviews();
        return this;
    },
    render_reviews:function(){
    //        this.ready = true;
        for (var i = this.model.reviews.models.length-1; i >= 0 ; i--) {
            var view = new ReviewView({model: this.model.reviews.models[i]});
            this.$(".review-list").append(view.render().el);
        }

        var createReview = new CreateReviewView({
            el: this.$el.find('.newReview')
        },{product:this.model.get('id')}).render();

        createReview.on('review_created', function(model) {
            var view = new ReviewView({model: model});
            this.$(".review-list").prepend(view.render().$el);
            this.model.reviews.add(model);

        }, this);
    }
});