json.extract! @spot, :id, :name, :description
json.taggings do
  json.array! @spot.taggings do |tagging|
    json.extract! tagging, :id, :tag_id
    json.extract! tagging.tag, :name
  end
end
