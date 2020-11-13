const WidgetsModel = require("../models/widgets.model");
const widgetsModel = new WidgetsModel();

class WidgetsController {
  getWeatherData(city) {
    return widgetsModel.fetchWeatherData(city);
  }
}

module.exports = WidgetsController;
