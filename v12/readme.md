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

## Auth Pt. 1 - Add User Model
* Install all packages needed for Auth
* Define User model

## Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

## Auth Pt. 3 - Login
* Add login routes
* Add login template 

## Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to the navbar
* Show/hide auth links correctly

## Auth Pt. 5 - Show/Hide Links
* Show/Hide auth links in navbar correctly

## Refactor the routes
* Use express routes to reorganize all routes

## Users + Comments
* Associate user and comments
* Save author's name to a comment automatically

## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

## Editing Campground
* Add Method-Override
* Add Edit Route for Campground
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

## Deleting Campground
* Add Destroy Route
* Add Delete Button

## Authorization: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

## Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campgrounds Edit Route:  <!--/campgrounds/:id/edit-->
Comment Edit Route:      <!--/campgrounds/:id/comments/:comment_id/edit-->

## Deleing Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route:   <!--/campgrounds/:id-->
Comment Destroy ROute       <!--/campgrounds/:id/comments/:comments_id-->

## Authorization: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware



## Adding in Flash! 
* Install and configure connect-flash
* Add bootstrap alerts to header

## Styling the home page
* Adding background slider for home page












