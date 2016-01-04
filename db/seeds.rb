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
             first_name: "Guest",
             last_name: "Guest",
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
                source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993606/bernal_heights1_zrnigs.jpg",
                imageable_id: 1,
                imageable_type: "Spot"
               },
               {
                 name: "Bernal Heights 2",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993586/bernal_heights2_ewipim.jpg",
                 imageable_id: 1,
                 imageable_type: "Spot"
               },
               {
                 name: "Bernal Heights 3",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993588/bernalheights3_epzmi6.jpg",
                 imageable_id: 1,
                 imageable_type: "Spot"
               },
               {
                 name: "Dolores Park 1",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993613/dolo1_bo7hef.jpg",
                 imageable_id: 2,
                 imageable_type: "Spot"
               },
               {
                 name: "Dolores Park 2",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993596/dolo2_i3nxhg.jpg",
                 imageable_id: 2,
                 imageable_type: "Spot"
               },
               {
                 name: "Dolores Park 3",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993615/dolo3_gnn9ee.jpg",
                 imageable_id: 2,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Cliffs 1",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993609/missioncliffs1_wvajz9.jpg",
                 imageable_id: 3,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Cliffs 2",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993613/missioncliffs2_hhfsy1.jpg",
                 imageable_id: 3,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Cliffs 3",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993612/missioncliffs3_dk4vbc.jpg",
                 imageable_id: 3,
                 imageable_type: "Spot"
               },
               {
                 name: "Fisherman's Wharf 1",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993588/FishermansWharf1_ge9ur3.jpg",
                 imageable_id: 4,
                 imageable_type: "Spot"
               },
               {
                 name: "Fisherman's Wharf 2",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993632/fishermanswharf2_leelw7.jpg",
                 imageable_id: 4,
                 imageable_type: "Spot"
               },
               {
                 name: "Fisherman's Wharf 3",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993616/fishermans-wharf3_pnqgew.jpg",
                 imageable_id: 4,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Recreational Center 1",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993603/mission_rec1_jyzord.jpg",
                 imageable_id: 5,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Recreational Center 2",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993614/missionrec2_wnhcyt.jpg",
                 imageable_id: 5,
                 imageable_type: "Spot"
               },
               {
                 name: "Mission Recreational Center 3",
                 source: "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1450993615/missionrec3_yhf35x.jpg",
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

  user = User.create(email: email,
                     first_name: first_name,
                     last_name: last_name,
                     password: "mystery",
                     wanderer_title: wanderer_title.sample)

  bg = ["bg1", "bg2"]
  Picture.create(name: "User Avatar",
                 source: Faker::Avatar.image(email, "200x200", "png", "set1", bg.sample),
                 imageable_id: user.id,
                 imageable_type: "User")
end

200.times do
  spot_id = rand(2..30)
  user_id = rand(1..51)
  rating = rand(1..5)
  review = Faker::Lorem.sentences(5)
  time = Faker::Time.between(20.days.ago, Date.today)
  Review.create(spot_id: spot_id,
                user_id: user_id,
                rating: rating,
                comment: review.join(" "),
                created_at: time,
                updated_at: time,
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

  3.times do
    tag_id = rand(1..31)
    Tagging.create( spot_id: new_spot.id, tag_id: tag_id )
  end
end

25.times do |n|
  name = Faker::Lorem.words(2)
  pictures = ["http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451882671/4B01A1274CA990A3577CC37E1DAA72F88DE353F8_osiure.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883631/337847_inrms3.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883626/GARNER-SP_HDR_3941_slqmdy.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883608/WaterworksPark4_x6beai.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883603/Jefferson_Park_in_Chicago_rg0gy7.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883558/Crooked_20Lake_20Sunset_qrxdrm_srfeg2.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883539/Round_Lake__2__-_Fayetteville_NY_emqu9o_omcelx.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883532/stelprdb5199597_v0ipna_bjlmqd.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883527/download.php_kxsom5_lqskah.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883501/4-day-taiwan-tour-from-taipei-sun-moon-lake-taroko-gorge-kenting-in-taipei-119083_ggleu0_h13eqt.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883491/Japantown-plaza-14jul2005_fhh4yf_lmilws.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883482/Cherry-Blossom-Festival_GEOS-SF_a5fo17_yik3t6.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883472/Ocean-Beach-Pier1_qdrtcq_lj8y1b.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883459/Drexel_Rec_Center_hot8tw_si87h2.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883447/Cottonwood_20Recreation_20Center4_nsmadd_ell6cw.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883435/IMG_9151_201404151630229903_xygbu6_itshec.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883521/Lambi_boardwalk_eornnu_wu4oaf.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883515/sun-moon-lake04_ta6ti5_l8i1ry.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883603/Jefferson_Park_in_Chicago_rg0gy7.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883608/WaterworksPark4_x6beai.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883626/GARNER-SP_HDR_3941_slqmdy.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451883631/337847_inrms3.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884128/scenic-hd-wallpapers_umqx1k.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884135/Sunrise_20Scenic_bt38l1.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884140/302002_lccmmf.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884146/N8IuzKe_gxmwg7.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884172/scenic-wallpapers-relaxing-tarantulatree-beautiful-tarantula-196011_dp4nzi.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884177/scenic_byways_dqowlx.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884181/9017360551_9687893e52_xq4e0h.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884185/14493_1512_Grand_Teton_Park_Scenic_Drive_md_wbad8n.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884191/karma_photography_scenic_010_t9z5ww.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884191/karma_photography_scenic_010_t9z5ww.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884197/scenic-photography-backgrounds_a6gwzl.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884200/drive_20ad7f68-4437-e663-4aa2f3a0079d8644_nqvilz.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884206/1750254_fjjea5.jpg",
              "http://res.cloudinary.com/stephlee/image/upload/c_fill,h_175,w_175/v1451884218/Van_duzer_state_scenic_corridor_dt77k3.jpg"
              ]
  3.times do
    Picture.create(
                    name: name,
                    source: pictures.sample,
                    imageable_id: (n + 6),
                    imageable_type: "Spot"
                   )
  end
end
