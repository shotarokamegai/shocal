class UsersController < ApplicationController
	def show
		user = User.find(session[:user_id])
		events = user.events
		render(:show, { locals: { user: user, events: events } })
	end

	def create
		user = User.create(name: params[:name], email: params[:email], zipcode: params[:zipcode], password: params[:password])
		redirect_to '/login'
	end

	def view
		user = User.find(session[:id])
		render(:index, { locals: { user: user } })
	end

	def edit
		user = User.find(params[:id])
		user.name = params[:name]
		user.name = params[:email]
		user.name = params[:zipcode]
		user.save
		redirect_to '/users'
	end
end