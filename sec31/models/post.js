const db = require("../data/database");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    this.id = id;
  }

	static async fetchAllPost() {
		const posts = await db.getDb().collection('posts').find().toArray();
		return posts
	}

	async fetchSinglePost() {
		const post = await db.getDb().collection('posts').findOne({ _id: this.id });
		return post
	}

  async savePost() {
    const newPost = await db.getDb().collection("posts").insertOne({
      title: this.title,
      content: this.content,
    });
    return newPost;
  }

  async updatePost() {
    const newPost = await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: this.id },
        { $set: { title: this.title, content: this.content } }
      );
    return newPost;
  }

  async deletPost() {
    const newPost = await db.getDb().collection('posts').deleteOne({ _id: this.id });
    return newPost;
  }

}

module.exports = Post;
