# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151230012616) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pictures", force: :cascade do |t|
    t.string   "name",           null: false
    t.string   "source",         null: false
    t.integer  "imageable_id",   null: false
    t.string   "imageable_type", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "pictures", ["imageable_id"], name: "index_pictures_on_imageable_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "spot_id",                null: false
    t.integer  "user_id",                null: false
    t.integer  "rating",     default: 5, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.text     "comment"
  end

  add_index "reviews", ["spot_id"], name: "index_reviews_on_spot_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "spot_addresses", force: :cascade do |t|
    t.integer  "spot_id",                                  null: false
    t.string   "street_address",                           null: false
    t.string   "city",           default: "San Francisco"
    t.string   "state",          default: "CA"
    t.integer  "zip",                                      null: false
    t.string   "neighborhood"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "spot_addresses", ["spot_id"], name: "index_spot_addresses_on_spot_id", unique: true, using: :btree

  create_table "spots", force: :cascade do |t|
    t.string   "name",                        null: false
    t.boolean  "approved",    default: false
    t.text     "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.float    "lat",         default: 0.0,   null: false
    t.float    "lng",         default: 0.0,   null: false
  end

  add_index "spots", ["name"], name: "index_spots_on_name", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "spot_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "tag_id",     null: false
  end

  add_index "taggings", ["spot_id"], name: "index_taggings_on_spot_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                           null: false
    t.string   "first_name",                                      null: false
    t.string   "last_name",                                       null: false
    t.string   "password_digest",                                 null: false
    t.string   "session_token",                                   null: false
    t.string   "wanderer_title",  default: "First-Time Wanderer"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
