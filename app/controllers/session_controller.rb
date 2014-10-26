class SessionController < ApplicationController
	def index
		render :index
	end

	def create
		user = User.find_by(email: params[:email])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			redirect_to '/users'
		else
			@error = true
			render :index
		end
	end

	def signup
		render :signup
	end

	def destroy
		binding.pry
		reset_session
		redirect_to '/login'
	end
end