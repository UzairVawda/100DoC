const express = require('express');
const router = express.Router();
const db = require('../data/database')

router.get("/", function(req, res, next) {
	res.redirect('/posts')
});

router.get("/posts", async function(req, res, next) {
	const [posts] = await db.query('SELECT posts.post_id, posts.title, posts.summary, posts.body, posts.date, authors.name, authors.email FROM blog.posts INNER JOIN blog.authors ON (posts.author_id = authors.author_id);');
	const postLen = posts.length
	res.status(200).render("postsList", {postLen: postLen, posts: posts});
});

router.get("/newPost", async function(req, res, next) {
	const [ authors ] = await db.query('SELECT * FROM authors');
	res.status(200).render("createPost", { allAuthors: authors });
});

router.post("/createPost", async function(req, res, next) {
	const data = [
		req.body.title, 
		req.body.summary,
		req.body.content,
		req.body.author,
	]
	await db.query('INSERT INTO blog.posts (title, summary, body, author_id) VALUES (?);', [data]);
	res.redirect('/posts')
});

router.get("/posts/view//:id", async function(req, res, next) {
	const postID = req.params.id
	const [ singlePost ] = await db.query('SELECT posts.post_id, posts.title, posts.summary, posts.body, posts.date, authors.name, authors.email FROM blog.posts INNER JOIN blog.authors ON (posts.author_id = authors.author_id) WHERE posts.post_id = ? ;', [postID]);
	if (!singlePost || singlePost.length == 0) {
		return res.status(404).redirect('404')
	}
	res.status(200).render("postDetail", { post: singlePost[0] });
});

router.get("/posts/edit/:id", async function(req, res, next) {
	const postID = req.params.id
	const [ authors ] = await db.query('SELECT * FROM authors');
	const [ singlePost ] = await db.query('SELECT posts.post_id, posts.title, posts.summary, posts.body, posts.date, authors.name, authors.email FROM blog.posts INNER JOIN blog.authors ON (posts.author_id = authors.author_id) WHERE posts.post_id = ? ;', [postID]);
	if (!singlePost || singlePost.length == 0) {
		return res.status(404).redirect('404')
	}
	console.log(singlePost)
	res.status(200).render("updatePost", { post: singlePost[0], authors: authors });
});

router.post('/updatePost/:id', async function (req, res, next) {
	await db.query('UPDATE posts SET posts.title = ?, posts.summary = ?, posts.body = ?, posts.author_id = ? WHERE posts.post_id = ? ;', [req.body.title, req.body.summary, req.body.content, req.body.author, req.params.id]);
	res.redirect("/posts");
})

router.post('/deletePost/:id', async function (req, res, next) {
	await db.query('DELETE FROM posts WHERE posts.post_id = ? ;', [req.params.id]);
	res.redirect("/posts");
})

module.exports = router;