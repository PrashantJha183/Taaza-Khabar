const express = require("express");
const News = require("../models/NewsArticle");
const fetchData = require("../middleware/fetchData");
const router = express.Router();

//-----------------------Fetching saved news article of the loggedin user "/api/news/fetchsavednews   login required"
router.post("/fetchsavednews", fetchData, async (req, res) => {
  try {
    //Fetching user id through middleware function fetchData
    const userId = req.user.id;

    //fetching all news articles saved by the user by passing user id which is fetched by middleware function
    const newsArticle = await News.find({ user: userId });
    res.json([newsArticle]);
  } catch (err) {
    console.error("Error message for fetchedsavednews route", err.message);
    res.status(500).send("Server Error");
  }
});

//-----------------Saving news for the logged in user "/api/news/savednews  login required-------------------"
router.post("/savednews", fetchData, async (req, res) => {
  try {
    // Check if the news article already exists for the user
    const existingArticle = await News.findOne({
      user: req.user.id,
      newsUrl: req.body.newsUrl,
    });

    if (existingArticle) {
      return res.status(400).json({ error: "Article already saved" });
    }
    //saving news for particluar loggedin user by passing authToken at header
    const { title, description, imageUrl, newsUrl, author, date, source } =
      req.body;

    const savednewsArticle = new News({
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source,
      user: req.user.id,
    });
    res.json(await savednewsArticle.save());
  } catch (err) {
    console.error("Error message for savednews route", err.message);
    res.status(500).send("Server Error");
  }
});

//----------Deleting saved news articles for the logged in the user "/api/news/deletesavednews  login required-----------"
router.delete("/deletesavednews/:id", fetchData, async (req, res) => {
  try {
    //find the news which is to be unsaved by the user by fetchin id of that news and passing it in routes
    let fetchSavedNewsForUser = await News.findById(req.params.id);
    if (!fetchSavedNewsForUser) {
      return res.status(404).json("Not found");
    }
    // Check if the loggedin user is the actual one which had saved that news beacuse we have and an id of that user with "user" varible in
    // the database if it is the actual user then allow him/her to unsave the news
    if (fetchSavedNewsForUser.user.toString() !== req.user.id) {
      return res.status(401).json("Unauthorized user");
    }

    const deletedNewsArticle = await News.findByIdAndDelete(req.params.id);
    res.json({ Success: "News article unsaved", deletedNewsArticle });
  } catch (err) {
    console.error("Error message for deletesavednews route", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
