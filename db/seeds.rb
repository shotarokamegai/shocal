# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Event.delete_all

user = User.create([{name: "Shotaro", email: "shotaro326@gmail.com", zipcode: 11220, password: "silverearth193"}, {name: "Daijiro", email: "daijiro0229@gmail.com", zipcode: 11220, password: "password"}])

events = Event.create([{ user_id: 1, title: "Pinic", date: "2014-10-29", address: "123 60th, New York, NY 11221", description: "セントラルパークでのんびりしましょう！", url: "ficebook.com", image: "http://upload.wikimedia.org/wikipedia/commons/0/05/Southwest_corner_of_Central_Park,_looking_east,_NYC.jpg", category: "sports" }, { user_id: 1, title: "Pinic", date: "2014-10-10", address: "123 60th, New York, NY 11221", description: "セントラルパークでのんびりしましょう！", url: "ficebook.com", image: "http://upload.wikimedia.org/wikipedia/commons/0/05/Southwest_corner_of_Central_Park,_looking_east,_NYC.jpg", category: "sports" }])