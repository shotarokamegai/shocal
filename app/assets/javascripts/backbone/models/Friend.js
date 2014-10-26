var ShoCal = ShoCal || { Models: {}, Collections: {}, Views: {} };

ShoCal.Models.Friend = Backbone.Model.extend({
	initialize: function(){
		console.log("A user has been birthed");
	},
	defaults:{
		name: ''
	}
});

// How to call this variable within the Penguinapp name space
// var penguin = new Penguinapp.Models.Penguin();