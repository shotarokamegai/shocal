class Event < ActiveRecord::Base
	belongs_to :users
	has_many :invitees
	has_many :users, through: :invitees
end