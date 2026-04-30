const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(async (username, password, done)=>{
    const user = await User.findOne({ username });
    if(!user) return done(null,false);

    const match = await bcrypt.compare(password, user.password);
    if(match) return done(null,user);

    return done(null,false);
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});