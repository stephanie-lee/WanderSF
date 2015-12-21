class Spot < ActiveRecord::Base
  validates :name, presence: true
  validates :approved, inclusion: { in: [true, false],
    message: "Can only be set to true or false"}

  has_many :reviews
  has_many :tags
end
