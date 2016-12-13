var express = require("express"),
    router = express.Router(),
    passport = require("passport");

var User = require("../models/user");

// root Route
router.get("/", function (req, res) {
    res.render("landing");
});

// show register page
router.get("/register", loggedIn, function(req, res){
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


// show login form
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

// logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


function loggedIn(req, res, next) {
    if (req.user) {
        return res.redirect('/campgrounds');
    }
    return next();
}

module.exports = router;