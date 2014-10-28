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

//render events and calendar

$(function(){
	renderEvents();
});


$(function(){

//category button change

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

//add indivisual event

	$('button#add-event').click(function(e){
		alert('an event has been updated!');
		e.preventDefault();
		var userId = window.location.pathname.split('/')[2];
		var title = $('input#title').val();
		var date = $('input#date').val();
		var address = $('input#address').val();
		var url = $('input#url').val();
		var image = $('input#image').val();	
		var category = $('button.dropdown-toggle')[1]
		category = $(category).attr('value');	
		var description = $('input#description').val();	
		$.ajax({
            url: '/add',
            data: { user_id: userId, title: title, date: date, address: address, url: url, image: image, category: category, description: description },
            type: 'POST',
            success: function(data){
        		var userId = window.location.pathname.split('/')[2]
				var day = $('tr').children().find('td[data-date=' + data.date + ']')[0];
				var a = document.createElement('a');
				$(a).attr('class', 'event');
				$(a).attr('id', data.id);			
				$(a).text(data.title);
				$('div.event').append(a);
			}
		});
	});

//update profile

	$('button#update-profile').click(function(e){
		console.log('Profile Update!');
		e.preventDefault();
		var userId = window.location.pathname.split('/')[2];
		var name = $('input#name').val();
		var email = $('input#email').val();
		var zipcode = $('input#zipcode').val();
		$.ajax({
            url: '/users/' + userId,
            data: { user_id: userId, name: name, email: email, zipcode: zipcode },
            type: 'PUT',
            success: function(e){
 				var user  = e[0].name
 				var city  = e[1]
 				var state = e[2]
            	var h2    = $('h2')[0];
            	$(h2).text(user + "'s calendar for " + city + ", " + state);
            	var modalTitle = $('h4#myModalLabel')[1];
            	modalTitle     = $(modalTitle).text(user);
            }
		});
		alert('your profile has been updated!');
	});

//add events from eventbrite

	$('button#add-eventbrite').click(function(){
		alert('an event has been updated!');
		var description = $(this).parent().parent().children()[0];
		description     = $(description).find('p')[0];
		description     = $(description).val();
		var title       = $(this).parent().parent().parent().find('div#one').find('h3').text();
		var image       = $(this).parent().parent().parent().find('div#one').find('img').attr('src');
		var date        = $(this).parent().parent().parent().find('div#two').find('h4')[0];
		date            = $(date).text();
		date            = date.replace(/^\s+/g, "");
		date            = date.replace(/\s+$/g, "");
		var address     = $(this).parent().parent().parent().find('div#two').find('h4')[1];
		address         = $(date).text();
		address         = address.replace(/^\s+/g, "");
		address         = address.replace(/\s+$/g, "");
		var url         = $(this).parent().parent().parent().find('div#three');
		url             = $(url).find('a').attr('href');
		$.ajax({ url: '/add' })
	});

//change months
	
	var leftButton = $('button.fc-corner-left')[1];
	$(leftButton).click(function(){
		renderEvents();
	});
});

//limit the number of letters in description

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

////////////////////////////////////////////////////////

function renderEvents(){
	var daysCol = $('td.fc-day')
	$(daysCol).each(function(){
		$(this).css('style', 'position: relative;');
		var div = document.createElement('div');
		$(div).attr('class', 'event');
		$(this).append(div);
	});
	var userId = window.location.pathname.split('/')[2]
	$.ajax({url: '/calendar', type: 'GET', data: { user_id: userId } }).done(function(events){
		$(events).each(function(e){
			var day = $('tr').children().find('td[data-date=' + this.date + ']')[0];
			var div = $(day).find('div.event');
			var a = document.createElement('a');
			var span = document.createElement('span');
			$(span).attr('class', 'glyphicon glyphicon-file');
			$(a).attr('class', 'event');
			$(a).attr('id', this.id);		
			$(a).attr('data-target', '#showEvent')
			$(a).attr('data-toggle' ,'modal')
			$(a).append(span);
			$(div).append(a);
			$(day).append(div);

//an event modal pops up

			$('a.event').click(function(){
				$('h4.event-title').text('');
				$('p.event-date').text('');
				$('p.event-category').text('');
				$('p.event-address').text('');
				$('a#showEventModal').remove();
				$('p.event-url').text('');
				$('p.event-description').text('');
				var userId = window.location.pathname.split('/')[2];
				$.ajax({ url: '/users/' + userId + '/events/' + $(this).attr('id'), type: 'POST', success: function(e){
					$('h4.event-title').text(e.title);
					$('p.event-date').text(e.date);
					$('p.event-category').text(e.category);
					$('p.event-address').text(e.address);
					var a = document.createElement('a');
					$(a).attr('id', 'showEventModal');
					$(a).text(e.url);
					$('p.event-url').text('');
					$('p.event-url').append(a);
					$('p.event-description').text(e.description);
					$('div.show-event').attr('background-image', 'url(' + e.image + ')');
				} });

			});
		});
	});
};

