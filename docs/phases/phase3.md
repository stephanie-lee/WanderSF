# Phase 3: Tags and Search (2 days)

## Rails
### Models
* Tag


### Controllers

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)

* SearchIndex

### Stores

### Actions
* ApiActions.receiveAllSpot -> triggered by ApiUtil
* ApiActions.receiveSingleSpot
* NotebookActions.fetchAllSpots -> triggers ApiUtil
* NotebookActions.fetchSingleSpot
* NotebookActions.createSpot

### ApiUtil
* ApiUtil.fetchAllSpots
* ApiUtil.fetchSingleSpot
* ApiUtil.createSpot

## Gems/Libraries
