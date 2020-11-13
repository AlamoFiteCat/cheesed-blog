const router = require("express").Router();
const editorRole = require("../middleware/editor-validate.middleware");
const authorValidator = require("../middleware/author-validate.middleware");
const PostsController = require("../controllers/posts.controller");

const postsController = new PostsController();

router.get("/:id?", (req, res) => {
  if (req.params && req.params.id) {
    postsController
      .fetchSinglePostById(req.params.id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        const errorObject = errorHandler("login", error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  } else {
    postsController
      .fetchPosts()
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error) => {
        const errorObject = errorHandler("login", error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

router.post("/", editorRole, (req, res) => {
  const author = req.session.profileData.username;
  postsController
    .createPost({ ...req.body, author: author })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      const errorObject = errorHandler("login", error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

router.put("/:id", authorValidator, (req, res) => {
  postsController
    .updatePost(req.params, req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      const errorObject = errorHandler("login", error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

router.delete("/:id", authorValidator, (req, res) => {
  postsController
    .deletePost(req.params)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      const errorObject = errorHandler("login", error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

module.exports = router;
