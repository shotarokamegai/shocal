require 'httparty'
require 'json'
require 'open-uri'
class EventsController < ApplicationController
	def create
		keyword = params[:keyword]
		keyword = URI::encode(keyword)
		response = HTTParty.get('https://www.eventbriteapi.com/v3/events/search/?q=' + keyword + '&token=L63P3AURXQRRWKHV36JC')
		binding.pry
	end

	def set
		binding.pry
		user = User.find(params[:id])
	end
end