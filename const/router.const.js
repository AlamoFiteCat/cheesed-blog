const router = require("express").Router();

const auth = require("../routes/auth.routes");
const posts = require("../routes/posts.routes");
const users = require("../routes/user.routes");
const profile = require("../routes/profile.routes");
const widgets = require("../routes/widgets.routes");

router.use("/auth", auth);
router.use("/posts", posts);
router.use("/users", users);
router.use("/profile", profile);
router.use("/widgets", widgets);

module.exports = router;
