class Spot < ActiveRecord::Base
  validates :name, presence: true
  validates :approved, inclusion: { in: [true, false],
    message: "Can only be set to true or false"}

  has_many :reviews
  has_many :taggings
  has_many :tags,
    through: :taggings,
    source: :tag


  def self.find_by_tag_partial(str)
    partial = "%#{str}%"
    Spot.includes(:tags).references(:tags).where("tags.name LIKE ?", partial)
  end
end
