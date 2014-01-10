var CreateReviewView = Backbone.View.extend({
	el: '.newReview',
	template: '#add-review',
	events: {
		'click .submit-btn': 'submitReview',
		'click .stars': 'getRate',
		'mouseover .stars': 'hoverStars',
		'mouseleave .stars': 'clearStar',
		'mouseleave .starRate': 'clearAllStars'
	},
	initialize: function(args, options) {
		this.product = options.product;
        this.template = _.template($(this.template).html());
    },

	submitReview: function(e) {
		var field = this.$el.find('#content');
		var text = field.val();
		var review = new Review({
			product: this.product,
			text: text,
			rate: this.rate
		});
		field.val('');
		$('.starRate a.stars').css('background-position', '');

		review.save({}, {
            success: function(){
                this.trigger('review_created', review);
            },
            error: function(model, response) {
                console.log(response.responseText);
                $('.newReview .info').remove();
                $('.newReview').append('<div class="info"> You should sign in first </div>')
            }
        });
		e.preventDefault();
	},

	getRate: function(e) {
		$('.starRate a.stars').css('background-position', '');
		this.rate = $(e.target).attr('data-value');
		var r = this.rate;
		$.each($('.stars'), function(){
			if ($(this).attr('data-value')<=r) {
				$(this).css('background-position', 'left -16px');
			}
		});
		e.preventDefault();
	},

	hoverStars: function(e) {
		var star = $(e.currentTarget).attr('data-value');
		$.each($('.stars'), function() {
			var color = ($(this).css('background-position'));
			if ($(this).attr('data-value')<=star && color != '0% -16px') {
				$(this).css('background-position', 'left -32px');
		    }
		});
		e.preventDefault();
	},	
    
    clearStar: function(e) {
    	var star = $(e.currentTarget).attr('data-value');
    	if ($(e.currentTarget).css('background-position') != '0% -16px') {
    		$(e.currentTarget).css('background-position', '');
    	};
		e.preventDefault();
    },

    clearAllStars: function(e) {
    	$.each($('.stars'), function(){
			var color = ($(this).css('background-position'));
			if (color != '0% -16px') {
				$(this).css('background-position', '');
			}
		});
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});