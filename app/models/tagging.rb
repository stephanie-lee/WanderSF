class Tagging < ActiveRecord::Base
  validates :spot_id, :tag, presence: true
  validates :spot_id, uniqueness: { scope: :tag_id,
    message: "Spot has already been assigned this tag"}

  belongs_to :spot
  belongs_to :tag
end
