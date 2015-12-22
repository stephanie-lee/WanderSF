json.extract! @spot, :id, :name, :description
json.taggings do
  json.array! @spot.taggings do |tagging|
    json.extract! tagging, :id, :tag_id
    json.extract! tagging.tag, :name
  end
end
#
# json.tags do
#   json.array! @spot.tags do |tag|
#     json.extract! tag, :id, :name
#   end
# end

# json.reviews do
#   json.array! @spot.reviews do |review|
#     json.extract! review, :comment, :rating
#     json.commenter do
#       json.extract! review.user, :first_name, :last_name, :wanderer_title
#     end
#   end
# end
