class CreateSpotAddresses < ActiveRecord::Migration
  def change
    create_table :spot_addresses do |t|
      t.integer :spot_id, null:false
      t.string :street_address, null:false
      t.string :city, default: "San Francisco"
      t.string :state, default: "CA"
      t.integer :zip, null:false
      t.string :neighborhood

      t.timestamps null: false
    end

    add_index :spot_addresses, :spot_id, unique: true
  end
end
