const express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../data/database");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDB()
    .collection("posts")
    .find({}, { title: 1, summary: 1, "author.name": 1 })
    .toArray();
  const postLen = posts.length;
  res.status(200).render("posts-list", { allPosts: posts, len: postLen });
});

router.get("/posts/view/:id", async function (req, res, next) {
  let requestId = req.params.id;
  try {
    requestId = new ObjectId(requestId)
  } catch (error) {
    next(error);
  }

  const requestedPost = await db
    .getDB()
    .collection("posts")
    .findOne({ _id: requestId }, { summary: 0 });

  if (!requestedPost) {
    return res.status(404).render('404')
  }

  res.status(200).render("post-detail", { post: requestedPost });
});

router.get("/newPost", async function (req, res) {
  const authors = await db.getDB().collection("authors").find({}, { name: 1 }).toArray();
  res.status(200).render("create-post", { allAuthors: authors });
});

router.post("/newPost/create", async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDB()
    .collection("authors")
    .findOne({ _id: authorId });
  await db
    .getDB()
    .collection("posts")
    .insertOne({
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.content,
      author: {
        id: authorId,
        name: author.name,
        email: author.email,
      },
      date: new Date(),
    });

  res.redirect("/posts");
});

router.get("/posts/edit/:id", async function (req, res, next) {
  let requestId = req.params.id;

  try {
    requestId = new ObjectId(requestId)
  } catch (error) { 
    next(error);
  }

  const requestedPost = await db
    .getDB()
    .collection("posts")
    .findOne({ _id: requestId }, { title: 1, summary: 1, body: 1 });
  if (!requestedPost) {
    return res.status(404).render('404')
  }
  res.status(200).render("update-post", { post: requestedPost });
});

router.post("/posts/edit/:id", async function (req, res) {
  let requestId = req.params.id;

  try {
    requestId = new ObjectId(requestId)
  } catch (error) { 
    next(error);
  }
  await db
    .getDB()
    .collection("posts")
    .updateOne(
      { _id: requestId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
        },
      }
    );
  res.redirect(`/posts/view/${requestId}`);
});

router.post("/posts/delete/:id", async function (req, res) {
  await db
    .getDB()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/posts");
});

module.exports = router;
