json.extract! @review, :id, :comment, :spot_id, :rating
json.user do
  json.extract! @review.user, :first_name, :last_name, :wanderer_title
end
if current_user
  json.belongsToCurrentUser @review.user.id == current_user.id
end

# json.spot_id do
#   json.extract! @review.spot, :id
# end
