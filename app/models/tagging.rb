class Tagging < ActiveRecord::Base
  validates :spot_id, :tag, presence: true
  validates :spot_id, uniqueness: { scope: :tag_id,
    message: "Spot has already been assigned this tag"}

  belongs_to :spot
  belongs_to :tag


  # may use inverse_of
  def self.new_with_tag(tag_data)
    tag = Tag.find_by_name(tag_data[:name]) || Tag.create(name: tag_data[:name].capitalize)
    tagging = tag.taggings.new(spot_id: tag_data[:spot_id])
  end

end
