require 'bcrypt' 
class User < ActiveRecord::Base
	self.has_secure_password
	has_many :events
	has_many :friends, class_name: 'User'
end
