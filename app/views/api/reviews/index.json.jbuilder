json.array! @reviews do |review|
  json.extract! review, :id, :rating, :comment, :spot_id
  json.user do
    json.extract! review.user, :first_name, :last_name, :wanderer_title
  end
  # json.spot_id do
  #   json.extract! review.spot, :id
  # end
end
