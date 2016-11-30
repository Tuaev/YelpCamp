var express = require("express"),
   app = express(),
   bodyParser = require("body-parser"),
   mongoose = require("mongoose");


app.use(bodyParser.urlencoded({
   extended: true
}));
app.set("view engine", "ejs");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create({
//      name: "Dublin Mount",
//      image: "http://www.photosforclass.com/download/321487195"
//   },
//   function (error, campground) {
//      if (error) {
//         console.log("Error!");
//         console.log(error);
//      } else {
//         console.log('Added new Campground');
//         console.log(campground);
//      }
//   }
//)


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
   Campground.findById(req.params.id, function(error, foundCampground){
      if(error){
         console.log(error);
      } else {
         res.render("show", {campground: foundCampground});
      }
   });
})


app.listen(3000, function () {
   console.log("The YelpCamp has started")
})