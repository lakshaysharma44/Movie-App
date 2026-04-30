const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { userSchema } = require("../validation/schema");

// REGISTER PAGE
router.get("/register",(req,res)=>{
    res.render("register");
});

// REGISTER + AUTO LOGIN
router.post("/register", async(req,res,next)=>{
    const { error } = userSchema.validate(req.body);
    if(error) return res.send(error.details[0].message);

    const hash = await bcrypt.hash(req.body.password,10);

    const user = new User({...req.body, password: hash});
    await user.save();

    req.login(user,(err)=>{
        if(err) return next(err);
        res.redirect("/movie");
    });
});

// LOGIN PAGE
router.get("/login",(req,res)=>{
    res.render("login");
});

// LOGIN
router.post("/login",
    passport.authenticate("local",{
        successRedirect: "/movie",
        failureRedirect: "/login"
    })
);

// LOGOUT
router.get("/logout",(req,res)=>{
    req.logout(()=>{});
    res.redirect("/login");
});

module.exports = router;