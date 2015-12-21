class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :taggings
end
