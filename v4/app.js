var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
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
            res.render("campgrounds/index", {
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
    res.render("campgrounds/new");
})

// SHOW - Shows more info about one campground 
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// ====================================
// ========= COMMENTS ROUTES ==========
// ====================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
});


app.post("/campgrounds/:id/comments", function(req,res){
    // look up comment using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    // create new 
    // connect new comment to campground
    // redirec campground show page
})



app.listen(3000, function () {
    console.log("The YelpCamp has started")
})