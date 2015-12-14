# Phase 2: Flux Architecture, Temporary Seed Data for Spots, Reviews CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* SpotsIndex
  - SpotsIndexItem
* ReviewForm

### Stores
* Reviews

### Actions
* ApiActions.receiveAllReviews -> triggered by ApiUtil
* ApiActions.receiveSingleReview
* ApiActions.deleteReview
* ReviewActions.fetchAllReviews -> triggers ApiUtil
* ReviewActions.fetchSingleReview
* ReviewActions.createReview
* ReviewActions.editReview
* ReviewActions.destroyReview

### ApiUtil
* ApiUtil.fetchAllReviews
* ApiUtil.fetchSingleReview
* ApiUtil.createReview
* ApiUtil.editReview
* ApiUtil.destroyReview

## Gems/Libraries
* Flux Dispatcher (npm)
* Bootstrap
