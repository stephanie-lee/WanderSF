# FresherNote

[Heroku link][heroku] **NB:** (Set up on 12/14)

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

WanderSF is a web application inspired by Yelp built using Ruby on Rails
and React.js. The app will be a platform for users to find and share about
public parks and recreational facilities, as well as unique hangout spots.
WanderSF allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Search through spots with text or location
- [ ] Create, read, edit, and delete (your own) reviews
- [ ] Tag spots with multiple tags and search spots by tag categories
- [ ] Google Map API (Maybe with ability to look up directions? Or other nearby suggestions?)
- [ ] Suggest (submit request) for new spots or editing existing spot details
- [ ] Star-rating for spots
- [ ] Add photos for spots
- [ ] 'Like' reviews and parks
- [ ] Personal profile to edit (profile picture and basic details)

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Spots and Review Model and JSON API (2 days)

In Phase 1, I will implement user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will hold
the container for the application's root React component. Before
building out the front end, I will begin by setting up a full JSON API
for reviews and spots. Create seed data for reviews and spots.

[Details][phase-one]

### Phase 2: Flux Architecture, Temporary Seed Data for Spots, Reviews CRUD (3 days)

Phase 2 is focused on setting up Flux, the React Router, and the React
view structure for the main application. After the basic Flux
architecture has been set up, a Reviews store will be implemented and a
set of actions corresponding to the needed CRUD functionality created. Once this is done, I will create React views for the Spots `Index` and Review `Form`. At the end of Phase 2, Reviews can be created, read, edited, and destroyed in the browser.

[Details][phase-two]

### Phase 3: Tags and Search (2 days)

Phase 3 adds organization to the Reviews. *Reviews should save to the database when the form loses focus or is left idle after editing.* Reviews belong to a Spot, which has its own `Index Item` view, `Form`. Create JSON API for Spots. Spots can also now be tagged with multiple tags. Users can bring up a Spots `Index` with the real-time updated search bar by searching for name of the location.

[Details][phase-three]

### Phase 4: Spots Additions and Google Map (1 day)

Add more functionality for Spots, including creating React views for
the `Form`, and `Index Item`. Implement Google Maps API into Spots
`IndexItem` and `Index`. Spots in `Index` will update when map is moved.

[Details][phase-four]

### Phase 5: Extras for Spots Index Item (1 day)

Phase 5 will implement three features: Including a star-rating system when reviewing.

[Details][phase-five]

### Phase 6: Styling and Seeding (3 day)

For Phase 6 I will use Bootstrap to make things look nice. Notably,
adding in responsive buttons and links.

### Bonus Features (TBD)
- [ ] Search spot by tags
- [ ] Personal Profile with links to own reviews and likes
- [ ] Infinite Scroll for Spots Index and Index Item
- [ ] Likes/Reviews for parks + like counter
- [ ] Uploading photos

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
