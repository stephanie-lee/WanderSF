json.array! @taggings do |tagging|
  json.extract!(tagging, :id, :spot_id, :tag_id)
  json.tag tagging.tag.name
end
