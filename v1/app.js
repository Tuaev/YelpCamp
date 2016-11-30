var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
      {name: "Salmon Creek", image: "http://www.photosforclass.com/download/6090714876"},
      {name: "Dublin Mount", image: "http://www.photosforclass.com/download/321487195"},
      {name: "Cork Fields", image: "http://www.photosforclass.com/download/3823437635"},
   {name: "Salmon Creek", image: "http://www.photosforclass.com/download/6090714876"},
      {name: "Dublin Mount", image: "http://www.photosforclass.com/download/321487195"},
      {name: "Cork Fields", image: "http://www.photosforclass.com/download/3823437635"},
   {name: "Salmon Creek", image: "http://www.photosforclass.com/download/6090714876"},
      {name: "Dublin Mount", image: "http://www.photosforclass.com/download/321487195"},
      {name: "Cork Fields", image: "http://www.photosforclass.com/download/3823437635"},
   {name: "Salmon Creek", image: "http://www.photosforclass.com/download/6090714876"},
      {name: "Dublin Mount", image: "http://www.photosforclass.com/download/321487195"},
      {name: "Cork Fields", image: "http://www.photosforclass.com/download/3823437635"},
   ];


app.get("/", function(req, res){
   res.render("landing");
})

app.get("/campgrounds", function(req, res){
   res.render("campgrounds", {campgrounds: campgrounds});
   
})

app.post("/campgrounds", function(req, res){
//   get data from form and add to campground
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground)
   // redirect to campgrounds page
   res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
   res.render("new")
})


app.listen(3000, function(){
   console.log("The YelpCamp has started")
})