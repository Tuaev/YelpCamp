var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    seedDB          = require("./seeds"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");
    
    
    

seedDB();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Super Duper Top Secret Code!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});




// INDEX - Show all campgrounds
app.get("/", function (req, res) {
    res.render("landing");
});

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
});

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

});


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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});


app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
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

// ====================================
// ========= AUTH ROUTES ==========
// ====================================

// show register page
app.get("/register", loggedIn, function(req, res){
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


// show login form
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

// logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});


// Logged in middleware logic
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function loggedIn(req, res, next) {
    if (req.user) {
        return res.redirect('/campgrounds');
    }
    return next();
}

app.listen(3000, function () {
    console.log("The YelpCamp has started")
})




















