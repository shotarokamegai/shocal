require 'httparty'
require 'json'
require 'open-uri'
class EventsController < ApplicationController

	def event
		user = User.find(session[:user_id])
		event = user.events.find(params[:id])
		respond_to do |format|
			format.json { render :json => event }
		end
	end

	def create
		user = User.find(session[:user_id])
		zip = user.zipcode.to_s
		address = HTTParty.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&sensor=true')
		city = address["results"][0]["address_components"][1]["long_name"]
		city = city.split.join("+")
		city = city.downcase
		arry = []
		i = 0
		keyword = params[:keyword]
		keyword = URI::encode(keyword)
		keyword = "%22" + keyword.split.join("+") + "%22"
		category = params[:category]
		if category == "music"
			category = 103
		elsif category == "sports"
			category = 108
		elsif category == "networking"
			category = 113
		elsif category == "food/drinks"
			category = 110
		elsif category = "business"
			category = 101
		elsif categoty == "entertaining"
			category = 104
		end
		category = category.to_s
		if params[:date] != "" && params[:category] != "category"
			year = params[:date].split('/')[2].concat('-')
			month = params[:date].split('/')[0].concat('-')
			day = params[:date].split('/')[1]
			date = year.concat(month)
			date = date.concat(day)
			start_date = date + 'T00:00:00Z'
			finish_date = date + 'T23:59:59Z'

			# response = HTTParty.get('https://www.eventbriteapi.com/v3/events/search/?q=' + keyword + '&categories=' + category + '&start_date.range_start=' + start_date + '&start_date.range_end=' + finish_date + '&token=L63P3AURXQRRWKHV36JC')
			response = HTTParty.get('https://www.eventbriteapi.com/v3/events/search/?q=' + keyword + '&categories=' + category + '&venue.city=' + city + '&start_date.range_start=' + start_date + '&start_date.range_end=' + finish_date + '&token=L63P3AURXQRRWKHV36JC')
			events = response['events']
			while i < 10 do
				arry << events[i]
				i = i + 1
			end
			render(:result, { locals: { events: arry, user: user, category: params[:category] } } )
		elsif params[:category] == "category"
			response = HTTParty.get('https://www.eventbriteapi.com/v3/events/search/?q=' + keyword + '&start_date.range_start=' + start_date + '&start_date.range_end=' + finish_date + '&venue.city=' + city + '&token=L63P3AURXQRRWKHV36JC')
			events = response['events']
			while i < 10 do
				arry << events[i]
				i = i + 1
			end
			binding.pry
			render(:result, { locals: { events: arry, user: user, category: params[:category] } } )
		else
			response = HTTParty.get('https://www.eventbriteapi.com/v3/events/search/?q=' + keyword + '&venue.city=' + city + '&token=L63P3AURXQRRWKHV36JC')
			events = response['events']
			while i < 10 do
				arry << events[i]
				i = i + 1
			end
			render(:result, { locals: { events: arry, user: user, category: params[:category] } } )
		end
	end

	def set
		user = User.find(params[:user_id])
		events = user.events
		respond_to do |format|
			format.json { render :json => events }
		end
	end

	def createown
		user = User.find(params[:user_id])
		year = params[:date].split('/')[2].concat('-')
		month = params[:date].split('/')[0].concat('-')
		day = params[:date].split('/')[1]
		date = year.concat(month)
		date = date.concat(day)
		event = Event.create({
			user_id: params[:user_id],
			title: params[:title],
			date: date,
			address: params[:address],
			url: params[:url],
			image: params[:image],
			category: params[:category],
			description: params[:description]
		})
		respond_to do |format|
			format.json { render :json => event }
		end
	end

	def eventbrite
		user = User.find(params[:user_id])
 		date   = params[:date].split('/')
		year   = date[0].concat('-')
		month  = date[1].concat('-')
  		day    = date[2]
		yay    = year.concat(month)
		yay    = yay.concat(day)
		event = Event.create({
			user_id: params[:user_id],
			title: params[:title],
			date: yay,
			address: params[:address],
			url: params[:url],
			image: params[:image],
			category: params[:category],
			description: params[:description]
		})
		redirect_to '/users/#{params[:user_id]}/events'
	end

	def update
		event = Event.find(params[:id])
		event.title = params[:title]
		event.date = params[:date]
		event.address = params[:address]
		event.url = params[:url]
		event.image = params[:image]
		event.category = params[:category]
		event.description = params[:description]
		event.save
		redirect_to '/users/#{user_id}'
	end

	def destroy
		event = Event.find(params[:id])
		a = ""
		event.destroy
		event.destroy
		respond_to do |format|
			format.json { render :json => a }
		end		
	end
end


