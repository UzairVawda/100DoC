const Post = require("../models/post");
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const validationSession = require("../util/validation-session");
const validationPost = require("../util/validation-form");

function getHome(req, res) {
  res.render("welcome");
}

async function getAdmin(req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  const posts = await Post.fetchAllPost();

  sessionErrorData = validationSession.getSessionErrorData(req, {
		title: '',
		content: ''
	});

  res.render("admin", {
    posts: posts,
    inputData: sessionErrorData
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validationPost.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashSessionErrors(
      req,
      {
				hasError: true,
				message: "Invalid input - please check your data.",
				title: enteredTitle,
				content: enteredContent,
			},
      function () {
        res.redirect("/admin");
      }
    );
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const post = new Post(enteredTitle, enteredContent, (id = ""));
  await post.savePost();
  res.redirect("/admin");
}

async function getSinglePost(req, res, next) {
  let post;
  try {
    const postId = new ObjectId(req.params.id);
    const tempPost = new Post("", "", postId);
    post = await tempPost.fetchSinglePost();
  }
  catch (error) {
    // next(error)
    return res.render('404')
  }
  if (!post) {

    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  sessionErrorData = validationSession.getSessionErrorData(req, {
		title: post.title,
		content: post.content
	});

  req.session.inputData = null;

  res.render("single-post", {
    post: post,
    inputData: sessionErrorData
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;
  const postId = new ObjectId(req.params.id);

  if (!validationPost.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );
    return;
  }
  const post = new Post(enteredTitle, enteredContent, postId);
  await post.updatePost();

  res.redirect("/admin");
}

async function deletePost(req, res) {
  const postId = new ObjectId(req.params.id);
  const post = new Post(null, null, postId);
  await post.deletPost();

  res.redirect("/admin");
}

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  createPost: createPost,
  getSinglePost: getSinglePost,
  updatePost: updatePost,
  deletePost: deletePost,
};
