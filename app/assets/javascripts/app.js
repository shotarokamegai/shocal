var ShoCal = ShoCal || { Models: {}, Collections: {}, Views: {} };
var eventscollection;

ShoCal.initialize = function(){
	eventscollection = new ShoCal.Collections.EventsCollection();

	var listView = new ShoCal.Views.EventsListView({
		collection: collection,
		el: $('.events_list')
	});

	collection.fetch();

	$('.penguins').find('form').on('submit', function(e){
		e.preventDefault();
		var penguinName = $('input').val();
		$('input').val('')
		collection.create({name: penguinName})
	})
}



$(function(){
	console.log($('#penguin-template'))

	Penguinapp.initialize();

});