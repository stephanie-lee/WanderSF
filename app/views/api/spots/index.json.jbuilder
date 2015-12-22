json.array! @spots do |spot|
  json.extract! spot, :id, :name, :description
  json.taggings do
    json.array! spot.taggings do |tagging|
      json.extract! tagging, :id, :tag_id
      json.extract! tagging.tag, :name
    end
  end
end

#
# json.extract! spot, :id, :name, :description
# json.array! spot.taggings do |tagging|
#   json.id tagging, :tag_id
#   json.tag_name tagging, tagging.tag
# end
