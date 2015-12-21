class Fixtaggingstable < ActiveRecord::Migration
  def change
    remove_column(:taggings, :tag)
    add_column(:taggings, :tag_id, :integer, null: false)
    add_index :taggings, :tag_id
  end
end
