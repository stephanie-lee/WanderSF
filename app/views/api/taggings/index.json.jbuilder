json.array! @tags do |tag|
  json.extract!(tag, :id, :spot_id, :tag)
end
