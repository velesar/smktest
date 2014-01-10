var ReviewView = Backbone.View.extend({
        tagName:  "li",
        className: 'list-group-item',
        template: '#review',

        initialize: function() {
        	this.template = _.template($(this.template).html());
    	},

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

