class Tagging < ActiveRecord::Base
  validates :spot_id, :tag, presence: true

  belongs_to :spot
end
