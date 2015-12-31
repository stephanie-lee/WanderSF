# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Spot.delete_all
Review.delete_all
Tag.delete_all
Tagging.delete_all
Picture.delete_all

User.create( email: "guest@guest.com",
             first_name: "guest",
             last_name: "user",
             password: "password",
             wanderer_title: "Cautious Adventurer"
            )

Picture.create( name: "Guest Picture",
                source: "http://res.cloudinary.com/stephlee/image/upload/c_scale,h_200,w_200/v1451364008/puppy_hipster_mg5xie.jpg",
                imageable_id: 1,
                imageable_type: "User")

Review.create( spot_id: 1,
               user_id: 1,
               rating: 5,
               comment: "Man, this place is AWESOME! You can see the
                        entire city in all its glory. I will definitely
                        return to watch the sun rise.")

Spot.create([{
              name: "Bernal Heights Park",
              description: "Beautiful and easy hike to the top. Dogs love to run there!",
              lat: 37.743285,
              lng: -122.414607
             },
             {
              name: "Dolores Park",
              description: "Grassy plains cover a whole block. Recreational facilities are well taken care of!",
              lat: 37.7583,
              lng: -122.4275
             },
             {
              name: "Mission Cliffs",
              description: "Indoor rock climbing gym has challenging courses. Gym equipment is available as well.",
              lat: 37.760508,
              lng: -122.412504
             },
             {
              name: "Fisherman's Wharf",
              description: "Perfect for fun weekend excursions! Great shopping, eating, and touring experiences!",
              lat: 37.8083,
              lng: -122.4156
             },
             {
              name: "Mission Recreation Center",
              description: "Free gym and recreational facilities.",
              lat: 37.758155,
              lng: -122.412791
             }])

SpotAddress.create([{
                      spot_id: 1,
                      street_address: "Bernal Heights Blvd",
                      zip: 94110,
                      neighborhood: "Bernal Heights"
                    },
                    {
                      spot_id: 2,
                      street_address: "19th & Dolores St",
                      zip: 94114,
                      neighborhood: "Mission District"
                    },
                    {
                      spot_id: 3,
                      street_address: "2295 Harrison St.",
                      zip: 94110,
                      neighborhood: "Mission District"
                    },
                    {
                      spot_id: 4,
                      street_address: "Fisherman's Wharf",
                      zip: 94133,
                      neighborhood: "Fisherman's Wharf"
                    },
                    {
                      spot_id: 5,
                      street_address: "2450 Harrison St.",
                      zip: 94110,
                      neighborhood: "Mission District"
                    }])

Picture.create([{
                name: "Bernal Heights 1",
                source: "v1450993606/bernal_heights1_zrnigs.jpg",
                imageable_id: 1,
                imageable_type: "Spot"
               },
               {
                 name: "Bernal Heights 2",
                 source: "v1450993586/bernal_heights2_ewipim.jpg",
                 imageable_id: 1,
                 imageable_type: "Spot"
               },
               {
                 name: "Bernal Heights 3",
                 source: "v1450993588/bernalheights3_epzmi6.jpg",
                 imageable_id: 1,
                 imageable_type: "Spot"
               },
               {
                 name: "Dolores Park 1",
                 source: "v1450993613/dolo1_bo7hef.jpg",
                 imageable_id: 2,
                 imageable_type: "Spot"
               },
               {
                 name: "Dolores Park 2",
                 source: "v1450993596/dolo2_i3nxhg.jpg",
                 imageable_id: 2,
                 imageable_type: "Spot"
               },
               {
                 name: "Dolores Park 3",
                 source: "v1450993615/dolo3_gnn9ee.jpg",
                 imageable_id: 2,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Cliffs 1",
                 source: "v1450993609/missioncliffs1_wvajz9.jpg",
                 imageable_id: 3,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Cliffs 2",
                 source: "v1450993613/missioncliffs2_hhfsy1.jpg",
                 imageable_id: 3,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Cliffs 3",
                 source: "v1450993612/missioncliffs3_dk4vbc.jpg",
                 imageable_id: 3,
                 imageable_type: "Spot"
               },
               {
                 name: "Fisherman's Wharf 1",
                 source: "v1450993588/FishermansWharf1_ge9ur3.jpg",
                 imageable_id: 4,
                 imageable_type: "Spot"
               },
               {
                 name: "Fisherman's Wharf 2",
                 source: "v1450993632/fishermanswharf2_leelw7.jpg",
                 imageable_id: 4,
                 imageable_type: "Spot"
               },
               {
                 name: "Fisherman's Wharf 3",
                 source: "v1450993616/fishermans-wharf3_pnqgew.jpg",
                 imageable_id: 4,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Recreational Center 1",
                 source: "v1450993603/mission_rec1_jyzord.jpg",
                 imageable_id: 5,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Recreational Center 2",
                 source: "v1450993614/missionrec2_wnhcyt.jpg",
                 imageable_id: 5,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Recreational Center 3",
                 source: "v1450993615/missionrec3_yhf35x.jpg",
                 imageable_id: 5,
                 imageable_type: "Spot"
               }
               ])

Tag.create([{ name: "parks" },
            { name: "beaches" },
            { name: "bowling" },
            { name: "hiking" },
            { name: "indoor" },
            { name: "outdoor" },
            { name: "playgrounds" },
            { name: "trails" },
            { name: "rock climbing" },
            { name: "$$$" },
            { name: "tourist attraction" },
            { name: "hangout" },
            { name: "food" },
            { name: "gym" },
            { name: "free" },
            { name: "walking" },
            { name: "jogging" },
            { name: "biking" },
            { name: "tennis" },
            { name: "basketball" },
            { name: "baseball" },
            { name: "skating" },
            { name: "museum" },
            { name: "seating" },
            { name: "popular" },
            { name: "transportation" },
            { name: "swimming" },
            { name: "shopping" },
            { name: "tours" },
            { name: "landmark" },
            { name: "pet-friendly" },
          ])

Tagging.create([{ spot_id: 1, tag_id: 1 },
                { spot_id: 1, tag_id: 4 },
                { spot_id: 1, tag_id: 6 },
                { spot_id: 2, tag_id: 7 },
                { spot_id: 2, tag_id: 1 },
                { spot_id: 2, tag_id: 6 },
                { spot_id: 3, tag_id: 5 },
                { spot_id: 3, tag_id: 9 },
                { spot_id: 3, tag_id: 10 },
                { spot_id: 4, tag_id: 11 },
                { spot_id: 4, tag_id: 12 },
                { spot_id: 4, tag_id: 13 },
                { spot_id: 5, tag_id: 5 },
                { spot_id: 5, tag_id: 7 },
                { spot_id: 5, tag_id: 13 }
              ])

50.times do
  wanderer_title = ["Navigator",
                    "Amateur Wanderer",
                    "Professional Wanderer",
                    "Hopelessly Lost",
                    "Crossing Uncharted Territory",
                    "Outdoor Camper",
                    "Jungle Connoisseur",
                    "Wanderer For Pay",
                    "Castaway"]
  name = Faker::Name.name.split
  first_name, last_name = name[0], name[1]
  email = Faker::Internet.email

  User.create(email: email,
              first_name: first_name,
              last_name: last_name,
              password: "mystery",
              wanderer_title: wanderer_title.sample)
end

200.times do
  spot_id = rand(2..50)
  user_id = rand(1..50)
  rating = rand(1..5)
  review = Faker::Lorem.sentences(5)
  Review.create(spot_id: spot_id,
                user_id: user_id,
                rating: rating,
                comment: review.join(" ")
                )
end

25.times do
  RANDOM_TYPE = ["Park",
                 "Field",
                 "Gym",
                 "Boardwalk",
                 "Alley",
                 "",
                 "Hill",
                 "Peaks",
                 "Square",
                 "Fitness",
                 "Recreation Center"]

  spot_name = Faker::Address.street_name + " " + RANDOM_TYPE.sample
  description = Faker::Lorem.sentences(5)
  lat = rand(37.6941...37.8046)
  lng = rand(-122.507...-122.3872)

  new_spot = Spot.create(name: spot_name,
                        description: description,
                        lat: lat,
                        lng: lng)

  SF_ZIPS = [94102, 94103, 94104, 94105, 94107, 94108, 94109, 94110,
             94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121,
             94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132,
             94133, 94134, 94158]

  SF_NEIGHBORHOODS = [ "Bernal Heights", "The Castro", "Chinatown",
                       "Fisherman's Wharf", "Golden Gate Park",
                       "The Haight", "Hayes Valley", "Inner Richmond",
                       "Inner Sunset", "The Marina", "The Mission",
                       "Nob Hill", "Noe Valley", "North Beach",
                       "Outer Richmond", "Outer Sunset", "Pacific Heights",
                       "Potrero Hill", "Russian Hill", "SoMa",
                       "Tenderloin", "Union Square", "Western Addition"]

  street_address = Faker::Address.street_address
  zip = SF_ZIPS.sample
  neighborhood = SF_NEIGHBORHOODS.sample

  SpotAddress.create( spot_id: new_spot.id,
                      street_address: street_address,
                      zip: zip,
                      neighborhood: neighborhood)
end

25.times do |n|
  name = Faker::Lorem.words(2)
  Picture.create(
                  name: name,
                  source: "v1450993606/bernal_heights1_zrnigs.jpg",
                  imageable_id: (n + 6),
                  imageable_type: "Spot"
                 )
end

100.times do
  spot_id = rand(6..30)
  tag_id = rand(1..31)
  Tagging.create( spot_id: spot_id, tag_id: tag_id )
end
