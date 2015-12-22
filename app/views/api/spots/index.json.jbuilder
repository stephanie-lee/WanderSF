json.array! @spots do |spot|
  json.extract!(spot, :id, :name, :description)
  json.tags do
    json.array! spot.tags do |tag|
      json.extract! tag, :id, :name
    end
  end
end
