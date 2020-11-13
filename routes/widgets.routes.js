const router = require("express").Router();
const WidgetsController = require("../controllers/widgets.controller");

const widgetsController = new WidgetsController();

router.get("/weather", (req, res) => {
  let location;
  if (
    req.session &&
    req.session.profileData &&
    req.session.profileData.location
  ) {
    location = req.session.profileData.location;
  } else {
    location = "Skopje";
  }

  widgetsController.getWeatherData(location).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = router;
