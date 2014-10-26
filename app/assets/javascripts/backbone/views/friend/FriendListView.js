var ShoCal = ShoCal || { Models: {}, Collections: {}, Views: {} };

ShoCal.Views.FriendListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.render);
	},
	render: function(){
		var self = this;
		this.$el.empty();
		_.each(this.collection.models, function(friend){
			var friendView = new ShoCal.Views.FriendView({model: friend})
			// penguinView.setTemplate()
			self.$el.append( friendView.render().el );
		})
	}
})