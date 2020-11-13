const PostsModel = require("../models/posts.model");
const postsModel = new PostsModel();

class PostsController {
  fetchPosts() {
    return postsModel.getAllPosts();
  }

  fetchSinglePostById(id) {
    return postsModel.getSinglePostById(id);
  }

  createPost(postData) {
    return postsModel.createNewPost(postData);
  }

  updatePost(postId, postData) {
    return postsModel.updatePost(postId, postData);
  }

  deletePost(param) {
    return postsModel.deletePost(param);
  }
}

module.exports = PostsController;
