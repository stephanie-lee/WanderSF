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
