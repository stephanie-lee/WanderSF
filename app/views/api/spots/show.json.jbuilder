json.name @spot.name
json.reviews do
  json.array! @spot.reviews do |review|
    json.extract! review, :comment, :rating
    json.commenter do
      json.extract! review.user, :first_name, :last_name, :wanderer_title
    end
  end
end
