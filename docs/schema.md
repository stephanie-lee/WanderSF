# Schema Information

## spots
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
approved    | boolean   | not null, default: false
description | text      | 

## spot addresses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
address1    | string    | not null, indexed
city        | string    | not null ## Do I need this if always in SF?
state       | string    | not null ## Do I need this if always in SF?
zip_code    | integer   | not null, indexed ## only 5 digits
area        | string    | not null
latitude    | float     | not null         
longitude   | float     | not null         

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique, indexed
first_name      | string    | not null, indexed
last_name       | string    | not null, indexed
password_digest | string    | not null
session_token   | string    | not null, unique, indexed
wanderer_title  | string    | not null, default: "First-Time Wanderer"

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed
user_id     | integer   | not null, foreign key (references users), indexed
rating      | integer   | not null ## inclusion in validations(1-5)

## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | integer   | not null, foreign key (references spots), indexed

<!-- ## spot_likes
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
review_id   | integer   | not null, foreign key (references reviews), indexed -->

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
spot_id     | string    | not null, foreign key (references spots), indexed
tag         | string    | not null


spot likes join table
