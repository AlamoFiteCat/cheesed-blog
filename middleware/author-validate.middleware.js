module.exports = (req, res, next) => {
  process.firebase
    .firestore()
    .collection("posts")
    .doc(req.params.id)
    .get()
    .then((response) => {
      const postData = response.data();
      if (
        postData &&
        req.session &&
        req.session.profileData &&
        req.session.profileData.username === postData.author
      ) {
        next();
      } else {
        res.status(403).json({ message: "You are not the father!" });
      }
    });
};
