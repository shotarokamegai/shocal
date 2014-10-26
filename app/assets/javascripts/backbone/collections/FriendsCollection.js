var ShoCal = ShoCal || { Models: {}, Collections: {}, Views: {} };

ShoCal.Collections.FriendCollection = Backbone.Collection.extend({
	model: ShoCal.Models.Friend,
	url: '/friends'
});