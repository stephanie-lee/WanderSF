# WanderSF

[WanderSF web app][wandersf]

[wandersf]: http://www.wandersf.com

WanderSF is a web application built using Ruby on Rails
and React.js. The app is a platform for users to find and share about
public parks and recreational facilities (also known as **spots**), as well as unique hangout spots.

## Features

###Authentication

New users can create an account or sign in with a demo account. WanderSF implements custom authentication using `BCrypt` to salt and hash passwords, storing the encrypted string in the database. The user's submitted ratings and reviews are stored and will be visible when the user logs in for the next session.

###Navigation Bar

The **navigation bar** provides a direct link back to the home page as well as a tag search field. The current user's avatar doubles as a drop-down link that gives the option to sign out of the session.

###Tag Search

The **tag search** input field in the navigation bar implements `JQuery` Autocomplete and allows users to search through the database for tags matching their input string. Search results are updated in real time with the user's input. The user can both search by their own input or select one of the returned suggestions. Submitted searches will return the **search index** with listings that have been tagged by matching or similar tags.

###Search Index

Once a user submits a search, either through the tag search in the navigation bar or in the address bar, a list of spots with matching or similar tags will be returned. `Google Maps` API has been implemented to return a map with markers pinpointing the different spots. Clicking on individual markers or spot links will both lead to specified **spot detail pages**.

###Review
A user can only add a review once per spot. If the user has already reviewed the spot, they have options depending on where they are reviewing from.
There are two ways to leave reviews: home page form and spot page form

- **Home:** User must select an existing spot. The input field uses `JQuery` Autocomplete to provide existing suggestions. There is also an option to suggest a spot if it does not exist. Adding a review will   update both the "Recent Reviews" section as well as on the specified spot page. **If a user has already reviewed the specified spot, they will be notified and must confirm to overwrite the previous review.**

- **Spot:** User can leave ratings and reviews on each spot page. If the user has already reviewed the spot, they have the options to `edit` or `delete` their review. If the user chooses to edit the review, the pre-existing review will pre-fill the text box.

###Spot Detail Page
Each spot's page implements `Google Maps` API using a single marker to place the current spot's location by its coordinates. Functionality includes **adding tags** and **writing reviews**.


## Design Choices
When building this app, I focused on providing a simple, yet elegant, solution to finding out about fun outdoor activities and locations. I wanted the site to not be cluttered with information but rather provide information that people tend to look for: **what other people think about a place**, and **why**. I wanted the design and placement of components to feel intuitive and easy to use.

Some design choices were inspired by Yelp.

### Design Docs from proposal
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

### Bonus Features for future additions
- [ ] Search spot by tags
- [ ] Personal Profile with links to own reviews and likes
- [ ] Infinite Scroll for Spots Index and Index Item
- [ ] Likes/Reviews for parks + like counter
- [ ] Ability for user to upload photos
