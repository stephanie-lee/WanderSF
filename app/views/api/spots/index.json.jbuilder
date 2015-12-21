json.array! @spots do |spot|
  json.extract!(spot, :id, :name, :description)

  # json.reviews do
  #   json.array! spot.reviews do |review|
  #     json.extract! review, :comment, :rating
  #     json.commenter do
  #       json.extract! review.user, :first_name, :last_name, :wanderer_title
  #     end
  #   end
  # end
end
