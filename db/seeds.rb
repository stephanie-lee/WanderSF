# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create([{email: "steph@steph.com",
              first_name: "steph",
              last_name: "lee",
              password_digest: "abc",
              wanderer_title: "Navigator"},

             {email: "teresa@teresa.com",
               first_name: "teresa",
               last_name: "wen",
               password_digest: "abc",
               wanderer_title: "Amateur Wanderer"},

             {email: "alissa@alissa.com",
               first_name: "alissa",
               last_name: "fang",
               password_digest: "abc",
               wanderer_title: "Professional Wanderer"},

             {email: "ash@ash.com",
               first_name: "ash",
               last_name: "africa",
               password_digest: "abc",
               wanderer_title: "Hopelessly Lost"},

             {email: "millie@millie.com",
               first_name: "millie",
               last_name: "fung",
               password_digest: "abc",
               wanderer_title: "Crossing Uncharted Territory"}])

Review.create([{spot_id: 1,
                user_id: 1,
                rating: 4
                },

               {spot_id: 3,
                user_id: 2,
                rating: 5
               },

               {spot_id: 2,
                user_id: 5,
                rating: 1
               },

               {spot_id: 4,
                user_id: 3,
                rating: 2
               },

               {spot_id: 5,
                user_id: 4,
                rating: 3
               }])

Spot.create([{
              name: "Bernal Heights Park",
              description: "Beautiful and easy hike to the top. Dogs love to run there!"
             },
             {
              name: "Dolores Park",
              description: "Grassy plains cover a whole block. Recreational facilities are well taken care of!"
             },
             {
              name: "Mission Cliffs",
              description: "Indoor rock climbing gym has challenging courses. Gym equipment is available as well."
             },
             {
              name: "Fisherman's Wharf",
              description: "Perfect for fun weekend excursions! Great shopping, eating, and touring experiences!"
             },
             {
              name: "Mission Recreational Center",
              description: "Free gym and recreational facilities."
             }])

Tag.create([{
             name: "parks"
            },
            {
             name: "beaches"
            },
            {
             name: "bowling"
            },
            {
             name: "hiking"
            },
            {
             name: "indoor"
            },
            {
             name: "outdoor"
            },
            {
             name: "playgrounds"
            },
            {
             name: "trails"
            }
          ])

Tagging.create([{
                 spot_id: 1,
                 tag_id: 1
                },
                {
                 spot_id: 1,
                 tag_id: 2
                },
                {
                 spot_id: 1,
                 tag_id: 3
                },
                {
                 spot_id: 2,
                 tag_id: 4
                },
                {
                 spot_id: 2,
                 tag_id: 3
                },
                {
                 spot_id: 2,
                 tag_id: 5
                },
                {
                 spot_id: 3,
                 tag_id: 2
                },
                {
                 spot_id: 3,
                 tag_id: 6
                },
                {
                 spot_id: 3,
                 tag_id: 8
                },
                {
                 spot_id: 3,
                 tag_id: 3
                },
                {
                 spot_id: 4,
                 tag_id: 1
                },
                {
                 spot_id: 4,
                 tag_id: 6
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
                  imageable_id: 4,
                  imageable_type: "Spot"
                },
                {
                  name: "Mission Recreational Center 2",
                  source: "v1450993614/missionrec2_wnhcyt.jpg",
                  imageable_id: 4,
                  imageable_type: "Spot"
                },
                {
                  name: "Mission Recreational Center 3",
                  source: "v1450993615/missionrec3_yhf35x.jpg",
                  imageable_id: 4,
                  imageable_type: "Spot"
                }
                ])
