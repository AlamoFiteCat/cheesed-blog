const router = require("express").Router();
const errorHandler = require("../utils/error.handler");
const AuthController = require("../controllers/auth.controller");

const authController = new AuthController();

router.post("/login", (req, res) => {
  authController
    .loginUser(req.body)
    .then(async (loginData) => {
      req.session.user = loginData;
      const profileData = await process.firebase
        .firestore()
        .collection("users")
        .doc(req.session.user.user.email)
        .get();

      const userData = profileData.data();
      req.session.profileData = userData;

      res.status(200).json({
        currentEmail: loginData.user.email,
        currentUsername: userData.username,
      });
    })
    .catch((error) => {
      const errorObject = errorHandler("login", error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

router.post("/logout", (req, res) => {
  authController
    .logoutUser()
    .then(() => {
      req.session.user = undefined;
      req.session.profileData = undefined;
      res.status(200).json({ currentEmail: false, currentUsername: false });
    })
    .catch(() => {
      res.status(400).json({});
    });
});

router.post("/register", (req, res) => {
  authController
    .registerUser(req.body)
    .then(async (data) => {
      req.session.user = data;

      const profileData = await process.firebase
        .firestore()
        .collection("users")
        .doc(req.session.user.user.email)
        .get();

      const userData = profileData.data();
      req.session.profileData = userData;

      res.status(200).json({
        currentEmail: data.user.email,
        currentUsername: req.body.username,
      });
    })
    .catch((error) => {
      const errorObject = errorHandler("register", error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

module.exports = router;
