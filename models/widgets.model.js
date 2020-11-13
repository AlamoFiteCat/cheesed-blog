const weatherAPIKey = "82772daf9e4120e84e8ea13eae87de89";
const http = require("http");

class WidgetsModel {
  fetchWeatherData(city) {
    return new Promise((resolve, reject) => {
      http
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`,
          (res) => {
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk) => {
              rawData += chunk;
            });
            res.on("end", () => {
              try {
                const parsedData = JSON.parse(rawData);
                resolve({
                  icon: `http://openweathermap.org/img/wn/${parsedData.weather[0].icon}@2x.png`,
                  name: parsedData.name,
                  obtainedOn: new Date(),
                  description: parsedData.weather[0].description,
                  temperature: parsedData.main.temp - 273.15,
                  pressure: parsedData.main.pressure,
                  humidity: parsedData.main.humidity,
                });
              } catch (e) {
                reject(e.message);
              }
            });
          }
        )
        .on("error", (e) => {
          console.error(`Got error: ${e.message}`);
        })
        .end();
    });
  }
}

module.exports = WidgetsModel;
