var ShoCal = ShoCal || { Models: {}, Collections: {}, Views: {} };

ShoCal.Views.EventListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.render);
	},
	render: function(){
		var self = this;
		this.$el.empty();
		_.each(this.collection.models, function(event_){
			var eventView = new ShoCal.Views.EventView({model: event_})
			// penguinView.setTemplate()
			self.$el.append( eventView.render().el );
		})
	}
})