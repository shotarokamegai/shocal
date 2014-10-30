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
//= require jquery-ui
//= require moment
//= require fullcalendar
//= require turbolinks
//= require mapScript
//= require twitter/bootstrap
// require_tree .
//= require ./libraries/underscore

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
		alert('your event has been created!');
		e.preventDefault();
		var userId = window.location.pathname.split('/')[2];
		var title = $('input#title').val();
		$('input#title').val('');
		var date = $('input#datapicker').val();
		$('input#datapicker').val('');
		var address = $('input#address').val();
		$('input#address').val('');
		var url = $('input#url').val();
		$('input#url').val('');
		var image = $('input#image').val();
		$('input#image').val('');
		var category = $('button.dropdown-toggle')[1]
		category = $(category).attr('value');
		$(category).attr('value', 'category');
		var description = $('textarea#description').val();
		$('textarea#description').val('');
		addAjax(userId, title, date, address, url, image, category, description);
	});

//edit event

	$('button#editEvent').click(function(){
		alert('your event has been edited!');
		var eventId = $('input.hidden-id').attr('value');
		var userId = window.location.pathname.split('/')[2];
		var title = $('p.event-title').text();	
		var date = $('p.event-date').text();	
		var address = $('p.event-address').text();	
		var url = $('p.event-url').text();	
		var image = $('p.event-image').text();	
		var category = $('p.event-category').text();
		var description = $('p.event-description').text();
		$.ajax({ url: '/events/' + eventId, type: 'PUT', data: { user_id: userId, id: eventId, title: title, date: date, address: address, url: url, image: image, category: category, description: description }, success: function(){

		} });
	});

//update profile

	$('button#update-profile').click(function(e){
		console.log('profile updated!');
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
		alert('your event has been created!');
		var userId = window.location.pathname.split('/')[2];
		var description = $(this).parent().parent().children()[0];
		description     = $(description).find('p')[0];
		description     = $(description).val();
		var title       = $(this).parent().parent().parent().find('div#one').find('h3').text();
		var image       = $(this).parent().parent().parent().find('div#one').find('img').attr('src');
		var date        = $(this).parent().parent().parent().find('div#two').find('h4')[0];
		date            = $(date).text().split(' ')[0];
		date            = date.replace(/^\s+/g, "");
		date            = date.replace(/\s+$/g, "");
		var address     = $(this).parent().parent().parent().find('div#two').find('h4')[1];
		address         = $(address).text();
		address         = address.replace(/^\s+/g, "");
		address         = address.replace(/\s+$/g, "");
		var url         = $(this).parent().parent().parent().find('div#three');
		url             = $(url).find('a').attr('href');
		var category    = $('h4')[0];
		category        = $(category).text();
		category        = $(category).replace(/category/, '');
		addBriteAjax(userId, title, date, address, url, image, category, description);
	});

//change months
	
	var leftButton = $('button.fc-corner-left')[1];
	$(leftButton).click(function(){
		renderEvents();
		alert('your event has been updated!');
	});

//delete event
	
	 $('button#deleteEvent').click(function(){
		alert('your event has been deleted :(');
	 	var eventId = $(this).parent().children()[1];
	 	eventId     = $(eventId).attr('value');
	 	var id = $(this).parent().find('input').attr('value');
	 	var icon = $('body').find('a[id=' + id + ']');
	 	$(icon).remove();
	 	$.ajax({ url: '/events/' + eventId, type: 'DELETE', data: { id: eventId }, success: function(){
			renderEvents();	 		
	 	} });
	 });

});

//date picker

$(function(){
	$( "#datepicker" ).datepicker();
	var days = $('body').find('td[data-handler="selectDay"]').children();
	$(days).css('color', 'black');
	$(days).attr('style', 'text-decoration: none;');
	$(days).css('color', 'black');
	$(days).attr('style', 'border: 1px solid #aaaaaa;');
	$('div#ui-datepicker-div').css('background-color', 'white');
	$('div#ui-datepicker-div').attr('style', 'border: 1px solid #aaaaaa;');
	$('div#ui-datepicker-div').attr('style', 'padding: 0.5%;');
	$('div#ui-datepicker-div').attr('style', '	text-decoration: none;');
	$('div.date-picker-header').attr('style', 'border: 1px solid #aaaaaa;');
	$('div.date-picker-header').attr('style', 'background-color: #cccccc;');
	$('div.date-picker-header').attr('style', 'font-weight: bold;');
});

//data picker

$(function(){
	$( "#datapicker" ).datepicker();
	var days = $('body').find('td[data-handler="selectDay"]').children();
	$(days).css('color', 'black');
	$(days).attr('style', 'text-decoration: none;');
	$(days).css('color', 'black');
	$(days).attr('style', 'border: 1px solid #aaaaaa;');
	$('div#ui-datapicker-div').css('background-color', 'white');
	$('div#ui-datapicker-div').attr('style', 'border: 1px solid #aaaaaa;');
	$('div#ui-datapicker-div').attr('style', 'padding: 0.5%;');
	$('div#ui-datapicker-div').attr('style', '	text-decoration: none;');
	$('div.date-picker-header').attr('style', 'border: 1px solid #aaaaaa;');
	$('div.date-picker-header').attr('style', 'background-color: #cccccc;');
	$('div.date-picker-header').attr('style', 'font-weight: bold;');
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
	var userId = window.location.pathname.split('/')[2];
	$.ajax({url: '/calendar', type: 'GET', data: { user_id: userId } }).done(function(events){
		$(events).each(function(e){
			var day = $('tr').children().find('td[data-date=' + this.date + ']')[0];
			var div = $(day).find('div.event');
			$(div).children().remove();
			var a = document.createElement('a');
			// var span = document.createElement('span');
			// $(span).attr('class', 'glyphicon glyphicon-file');
			$(a).attr('class', 'event');
			$(a).attr('id', this.id);		
			$(a).attr('data-target', '#showEvent')
			$(a).attr('data-toggle' ,'modal')
			// $(a).append(span);
			$(a).text(this.title);
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
					$('input.hidden-id').attr('value', e.id);
					if (e.address != "") {
						$('p.event-address').text(e.address);
					} else {
						$('p.event-address').text('null');
					};
					if (e.url != "") {
						var a = document.createElement('a');
						$(a).attr('id', 'showEventModal');
						$(a).attr('href', e.url);
						$(a).text(e.url);
						$('p.event-url').append(a);
					} else {
						$('p.event-url').text('null');
					};
					if (e.description != "") {
						$('p.event-description').text(e.description);						
					} else {
						$('p.event-description').text('null');
					};
					$('img.event-image').attr('src', e.image);
				} });

			});
		});
	});
};

////////////////////////////////////////////////////////

function addAjax(userId, title, date, address, url, image, category, description){
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
			$(day).find('div.event').append(a);
			renderEvents();
		}
	});
};

///////////////////////////////////////////////////////

function addBriteAjax(userId, title, date, address, url, image, category, description){
	$.ajax({
        url: '/add/eventbrite',
        data: { user_id: userId, title: title, date: date, address: address, url: url, image: image, category: category, description: description },
        type: 'POST'
  //       success: function(data){
  //   		var userId = window.location.pathname.split('/')[2]
  //   		var date   = data.date.split('-');
  //   		var year   = date[1].concat('-');
  //   		var month  = date[2].concat('-');
  //   		var day    = date[0];
  //   		var yay    = year.concat(month);
  //   		yay        = yay.concat(day);
		// 	var day = $('tr').children().find('td[data-date=' + yay + ']')[0];
		// 	var a = document.createElement('a');
		// 	$(a).attr('class', 'event');
		// 	$(a).attr('id', data.id);	
		// 	$(a).text(data.title);
		// 	$(day).find('div.event').append(a);
		// }
	});
};

