# YelpCamlp
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

# Each Campground has:
* Name
* Image

# Layout and Basic Styling
* Create the header and footer partials
* Add in Bootstrap

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parcer
* Setup route to show form
* Add basic unstyled form

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the Navbar and Form
* Add a navbar to all template
* Style the campground form

# Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template


RESTful ROUTES e.g.

name     URL         verb     desc
=========================================
INDEX    /dogs       GET      - Display a list of all dogs
NEW      /dogs/new   GET      - Displays form to make a new dog
CREATE   /dogs       POST     - Add new dog t DB
SHOW     /dogs/:id   GET      - Show more info about one dog

# Refactor Mongoose Code
* Create a models directory
* Use model.exports
* Require everything correctly!

# Add seeds file
* Add a seeds.js file
* Run the seeds file every time the server starts

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

RESTful ROUTES e.g.

name     URL                verb     desc.
=========================================
INDEX    /campgrounds       GET      - Display a list of all campgrounds
NEW      /campgrounds/new   GET      - Displays form to make a new campground
CREATE   /campgrounds       POST     - Add new campground t DB
SHOW     /campgrounds/:id   GET      - Show more info about one campground

* Nest comments routes

NEW      /campgrounds/:id/comments/new      GET
CREATE   /campgrounds/:id/comments          POST

