const router = require("express").Router();

const ProfileController = require("../controllers/profile.controller");
const profileController = new ProfileController();

router.put("/password", (req, res) => {
  profileController
    .changePassword(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

router.delete("/", (req, res) => {
  profileController
    .deleteUser()
    .then(async (response) => {
      const email = req.session.profileData.email;
      await process.firebase
        .firestore()
        .collection("users")
        .doc(email)
        .delete();

      req.session.user = undefined;
      req.session.profileData = undefined;

      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(403).json(error);
    });
});

module.exports = router;
