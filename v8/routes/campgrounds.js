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
router.post("/", function (req, res) {
    //   get data from form and add to campground
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: description
    };
    // Create new campground and save to database
    Campground.create(newCampground, function (error, newCampgroundInsert) {
        if (error) {
            console.log(error);
        } else {
            // redirect to campgrounds page
            res.redirect("/campgrounds");
            console.log("new campground added");
        }
    });

});


// NEW - Show form to create new campground
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - Shows more info about one campground 
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;