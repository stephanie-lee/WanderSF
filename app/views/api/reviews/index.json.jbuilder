json.array! @reviews do |review|
  json.extract! review, :id, :rating, :comment, :spot_id, :updated_at
  json.spot_name review.spot, :name
  json.user do
    json.extract! review.user, :id, :first_name, :last_name, :wanderer_title
    if review.user.picture
      json.avatar review.user.picture, :name, :source
    end
  end
  if current_user
    json.belongsToCurrentUser review.user.id == current_user.id
  end

  date_array = review[:updated_at].to_s(:db).split.first.split("-")

  json.date "#{date_array[1]}/#{date_array[2]}/#{date_array[0]}"
end
