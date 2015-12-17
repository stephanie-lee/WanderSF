json.id @review.id
json.spot_id @review.spot_id
json.rating @review.rating
json.comment @review.comment
json.first_name @review.user.first_name
json.last_name @review.user.last_name

if current_user
  json.belongsToCurrentUser @review.user_id == current_user.id
end
