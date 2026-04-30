const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

require("./config/passport");

const app = express();

// DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/movieDB")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// VIEW ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// GLOBAL USER (for EJS)
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


// ✅ DEFAULT ROUTE (SMART REDIRECT)
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/movie");   // already logged in
    }
    res.redirect("/login");              // not logged in
});


// ROUTES
app.use("/", require("./routes/auth"));
app.use("/movie", require("./routes/movie"));


// SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/login");
});