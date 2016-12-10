var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Show all campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from database
    Campground.find({}, function (error, allCampgrounds) {
        if (error) {
            console.log("Error!");
            console.log(error);
        } else {
            console.log('Rendering...');
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });
});

// CREATE - Add new campground to database
router.post("/", isLoggedIn, function (req, res) {
    //   get data from form and add to campground
    var name        = req.body.name,
        image       = req.body.image,
        description = req.body.description,
        author      = {
                id: req.user._id,
                username: req.user.username
            };
    
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
    };

    // Create new campground and save to database
    Campground.create(newCampground, function (error, newlyCreated) {
        if (error) {
            console.log(error);
        } else {
            // redirect to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });

});


// NEW - Show form to create new campground
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - Shows more info about one campground 
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;