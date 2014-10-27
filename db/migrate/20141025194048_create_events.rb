class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.integer :user_id
    	t.string :title
        t.string :date
    	t.string :address
    	t.string :description
    	t.string :url
    	t.string :image
    	t.string :category
    	t.timestamps
    end
  end
end
