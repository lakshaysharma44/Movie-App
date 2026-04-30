const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const { movieSchema } = require("../validation/schema");
const { isLoggedIn } = require("./middleware");

// READ
router.get("/", isLoggedIn, async(req,res)=>{
    const movies = await Movie.find();
    res.render("movies",{ movies });
});

// CREATE
router.post("/", isLoggedIn, async(req,res)=>{
    const { error } = movieSchema.validate(req.body);
    if(error) return res.send(error.details[0].message);

    const movie = new Movie(req.body);
    await movie.save();

    res.redirect("/movie");
});

// EDIT PAGE
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.send("Movie not found");
    }

    res.render("editMovie", { movie });
});

// UPDATE (movieName LOCKED)
router.put("/:id", isLoggedIn, async (req, res) => {
    console.log("BODY:", req.body); // 👈 add this for debug

    const { duration, isAdult } = req.body;

    await Movie.findByIdAndUpdate(req.params.id, {
        duration,
        isAdult
    });

    res.redirect("/movie");
});

// DELETE
router.delete("/:id/delete", isLoggedIn, async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movie");
});

module.exports = router;