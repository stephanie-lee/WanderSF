json.array! @reviews do |review|
  json.extract! review, :id, :rating, :comment, :spot_id
  json.user do
    json.extract! review.user, :id, :first_name, :last_name, :wanderer_title
  end
  if current_user
    json.belongsToCurrentUser review.user.id == current_user.id
  end
end
