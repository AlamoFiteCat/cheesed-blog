const router = require("express").Router();

router.get("/current", (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      currentEmail: req.session.user.user.email,
      currentUsername: req.session.profileData.username,
    });
  } else {
    res.status(200).json({
      currentEmail: false,
      currentUsername: false,
    });
  }
});

module.exports = router;
