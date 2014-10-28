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
//= require mapScript
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
	var daysCol = $('td.fc-day')
	$(daysCol).each(function(){
		$(this).css('style', 'position: relative;');
		var div = document.createElement('div');
		$(div).attr('class', 'event');
		$(this).append(div);
	});
	var userId = window.location.pathname.split('/')[2]
	$.ajax({url: 'http://localhost:3000/calendar', type: 'GET', data: { user_id: userId } }).done(function(events){
		$(events).each(function(e){
			var day = $('tr').children().find('td[data-date=' + this.date + ']')[0];
			var div = $(day).find('div.event');
			var a = document.createElement('a');
			var span = document.createElement('span');
			$(span).attr('class', 'glyphicon glyphicon-file');
			$(a).attr('class', 'event');
			$(a).attr('id', this.id);		
			$(a).append(span);
			$(div).append(a);
			$(day).append(div);
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
    });

	$('button#add-event').click(function(e){
		e.preventDefault();
		console.log('AJAX!');
		var userId = window.location.pathname.split('/')[2]
		var title = $('input#title').val();
		var date = $('input#date').val();
		var address = $('input#address').val();
		var url = $('input#url').val();
		var image = $('input#image').val();	
		var category = $('button.dropdown-toggle')[1]
		category = $(category).attr('value');	
		var description = $('input#description').val();	
		$.ajax({
            url: 'http://localhost:3000/add',
            data: { user_id: userId, title: title, date: date, address: address, url: url, image: image, category: category, description: description },
            type: 'POST',
            success: function(data){
        		var userId = window.location.pathname.split('/')[2]
				var day = $('tr').children().find('td[data-date=' + data.date + ']')[0];
				var a = document.createElement('a');
				$(a).attr('class', 'event');
				$(a).attr('id', data.id);			
				$(a).text(data.title);
				$(day).append(a);
			}
		});
	});
});

$(function(){
	var $setElm = $('div.event-result').find('p');
	var cutFigure = '120';
	var afterTxt = ' …';

	$setElm.each(function(){
		var textLength = $(this).text().length;
		var textTrim = $(this).text().substr(0,(cutFigure))

		if(cutFigure < textLength) {
			$(this).html(textTrim + afterTxt).css({visibility:'visible'});
		} else if(cutFigure >= textLength) {
			$(this).css({visibility:'visible'});
		}
	});
});



