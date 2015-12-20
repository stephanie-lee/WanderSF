json.id @review.id
json.spot_id @review.spot_id
json.rating @review.rating
json.comment @review.comment

json.user do
  json.user_id @review.user.id
  json.first_name @review.user.first_name
  json.last_name @review.user.last_name
  json.wanderer_title @review.user.wanderer_title
end

if current_user
  json.belongsToCurrentUser review.user.id == current_user.id
end
