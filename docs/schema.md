# Schema Information

## spots
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
approved    | boolean   | not null, default: false
spot_likes  | integer   | not null, default: 0

## spot addresses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
address1    | string    | not null
city        | string    | not null ## Do I need this if always in SF?
state       | string    | not null ## Do I need this if always in SF?
zip_code    | integer   | not null ## only 5 digits
area        | string    | not null
latitude    | float     |           ## Question for TA: how should I default this value?
longitude   | float     |           ## Question for TA: how should I default this value?

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
first_name      | string    | not null, indexed
last_name       | string    | not null, indexed
password_digest | string    | not null
session_token   | string    | not null, unique
wander_title    | string    | not null, default: "First-Time Wanderer"
review_count    | integer   | not null, default: 0

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
user_id     | integer   | not null, foreign key (references users), indexed
rating      | integer   | not null ## inclusion in validations(1-5)
review_likes| integer   | not null, default: 0

## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
num_ratings | integer   | not null
avg_rating  | float     | not null

## spot_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
user_id     | integer   | not null, foreign key (references users), indexed

## review_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
user_id     | integer   | not null, foreign key (references users), indexed
review_id   | integer   | not null, foreign key (references reviews), indexed

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | string    | not null, foreign key (references spots), indexed
tag         | string    | not null
