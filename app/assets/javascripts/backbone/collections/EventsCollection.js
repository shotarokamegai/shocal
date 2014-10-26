var ShoCal = ShoCal || { Models: {}, Collections: {}, Views: {} };

ShoCal.Collections.EventCollection = Backbone.Collection.extend({
	model: ShoCal.Models.Event,
	url: '/events'
});