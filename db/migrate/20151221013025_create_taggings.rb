class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :spot_id, null: false
      t.string :tag, null: false

      t.timestamps null: false
    end
    add_index :taggings, :spot_id
  end
end
