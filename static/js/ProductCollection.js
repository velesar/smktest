var ProductCollection = Backbone.Collection.extend({
            model: Product,
            url: '/api/products',
            initialize:function(){
                this.on('add',this.fetch_product_reviews, this);
            },
            fetch_product_reviews:function(product){
                product.fetch_reviews();
            }
});
