// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require moment
//= require fullcalendar
//= require turbolinks
//= require twitter/bootstrap
// require_tree .
//= require ./libraries/underscore
//= require ./libraries/backbone

//= require ./backbone/app
//= require ./backbone/models/Event
//= require ./backbone/models/Friend
//= require ./backbone/collections/EventsCollection
//= require ./backbone/collections/FriendsCollection
//= require ./backbone/views/Event/EventListView
//= require ./backbone/views/Friend/FriendListView

$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        // put your options and callbacks here
    })

});

$(function(){
	var days = $('tr').children().find('td.fc-day');
	$.ajax({url: 'http://127.0.0.1:3000/calendar', success: function(e){
		debugger

	}});
});