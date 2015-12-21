class AddColumntoTags < ActiveRecord::Migration
  def change
    add_column :tags, :name, :string, null:false
  end
end
