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
		arry = []
		i = 0
		keyword = params[:keyword]
		keyword = URI::encode(keyword)
		response = HTTParty.get('https://www.eventbriteapi.com/v3/events/search/?q=' + keyword + '&token=L63P3AURXQRRWKHV36JC')
		events = response['events']
		while i < 10 do
			arry << events[i]
			i = i + 1
		end
		render(:result, { locals: { events: arry, user: user, category: params[:category] } } )
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
		event = Event.create({
			user_id: params[:user_id],
			title: params[:title],
			date: params[:date],
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
end


