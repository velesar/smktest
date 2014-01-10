
  window.ProductView = Backbone.View.extend({
    tagName:  "li",
    className: 'product',
    template: '#product',
    events:{
        'click':'on_click'
    },
    initialize: function() {
        this.template = _.template($(this.template).html());
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    on_click:function(){
        this.trigger('select',this.model);
        $('.product').removeClass('marked')
        this.$el.addClass('marked');
    }

  });  
