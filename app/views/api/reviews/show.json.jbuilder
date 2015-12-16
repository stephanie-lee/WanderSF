json.review do
  json.extract! @review, :comment
  json.user do
    json.extract! @review.user, :first_name, :last_name, :wanderer_title
  end
  json.spot do
    json.extract! @review.spot, :name, :description
  end
end
