var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");

seedDB();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("landing");
})

// INDEX - Show all campgrounds
app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from database
    Campground.find({}, function (error, allCampgrounds) {
        if (error) {
            console.log("Error!");
            console.log(error);
        } else {
            console.log('Rendering...');
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    })


})

// CREATE - Add new campground to database
app.post("/campgrounds", function (req, res) {
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
            console.log("new campground added")
        }
    })

})


// NEW - Show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new")
})

// SHOW - Shows more info about one campground 
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            console.log(foundCampground);
            res.render("show", {
                campground: foundCampground
            });
        }
    });
})


app.listen(3000, function () {
    console.log("The YelpCamp has started")
})