require 'json'
require 'httparty'
class UsersController < ApplicationController
	def show
		user = User.find(session[:user_id])
		events = user.events
		zip = user.zipcode.to_s
		address = HTTParty.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&sensor=true')
		city = address["results"][0]["address_components"][1]["long_name"]
		state = address["results"][0]["address_components"][3]["long_name"]
		render(:show, { locals: { user: user, events: events, city: city, state: state } })
	end

	def create
		user = User.create(name: params[:name], email: params[:email], zipcode: params[:zipcode], password: params[:password])
		redirect_to '/login'
	end

	def view
		user = User.find(session[:id])
		render(:index, { locals: { user: user } })
	end

	def update
		arry = []
		user = User.find(params[:id])
		user.name = params[:name]
		user.email = params[:email]
		user.zipcode = params[:zipcode]
		user.save
		zip = user.zipcode.to_s
		address = HTTParty.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&sensor=true')
		city = address["results"][0]["address_components"][1]["long_name"]
		state = address["results"][0]["address_components"][3]["long_name"]
		arry.push(user, city, state)
		respond_to do |format|
			format.json { render :json => arry }
		end
	end
end