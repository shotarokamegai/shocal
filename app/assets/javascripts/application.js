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
	var userId = window.location.pathname.split('/')[2]
	$.ajax({url: 'http://localhost:3000/calendar', type: 'GET', data: { user_id: userId } }).done(function(events){
		$(events).each(function(e){
			var day = $('tr').children().find('td[data-date=' + this.date + ']')[0];
			var p = document.createElement('p');
			$(p).attr('class', 'event');
			$(p).attr('id', this.id);			
			$(p).text(this.title);
			$(day).append(p);
		});
		var schedule = $('td').find('p[class="event"]');
			$(schedule).click(function() {
	  		console.log('Good Job!');
		});
	});
});

 $(function(){
    $(".dropdown-menu li a").click(function(){
    	$('input#hidden').remove();
	    $(this).parent('li').parent().parent().find('button').text($(this).text());
	    $(this).parent('li').parent().parent().find('button').val($(this).text());
	    var hidden = document.createElement('input')
	    $(hidden).attr('name', 'category');
	    $(hidden).attr('type', 'hidden');
	    $(hidden).attr('id', 'hidden');
	    $(hidden).attr('value', $(this).text());
	    $('form.navbar-form').append(hidden);
	    debugger
   });
});