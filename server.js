// [Imports]
const express = require("express");
const cors = require("./const/cors.const");
const router = require("./const/router.const");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const setup = require("./setup");

// [Firebase Setup]
const fbClient = require("./const/firebase.const");

// [Server Setup]
const session = require("./const/session.const");

// [Express Init]
const app = express();
const http = require("http").createServer(app);

// [Helmet Security]
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "example.com"],
      objectSrc: ["'none'"],
      imgSrc: ["'self'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(helmet.hidePoweredBy());
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);
app.use(
  helmet.hsts({
    maxAge: 0,
  })
);
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(
  helmet({
    frameguard: {
      action: "deny",
    },
  })
);
app.use(helmet.xssFilter());

// [SocketIO]
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type, Accept, APPKEY, withCredentials"],
    credentials: true,
  },
});

// [Twitter]
const {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
} = process.env;

const twitterConfig = {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  timeout_ms: 60 * 1000,
};

const Twit = require("twit");
const T = new Twit(twitterConfig);

const PORT = 8080;
const HOST = "0.0.0.0";

app.set("trust proxy", 1);
app.use(cors);
app.use(express.static(path.join(__dirname, "static")));

app.get(/^\/(?!api).*/, function (req, res) {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.use(session);

// [Parsing]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// [Router]
app.use("/api", router);

io.on("connection", (socket) => {
  // [Twitter Stream]
  T.get("search/tweets", { q: "#coding", count: 5 }, (err, data, response) => {
    const tweetArray = [];

    data.statuses.forEach((tweet) => {
      const tweetbody = {
        text: tweet.text,
        userScreenName: "@" + tweet.user.screen_name,
        userImage: tweet.user.profile_image_url_https,
        userDescription: tweet.user.description,
      };
      try {
        if (tweet.entities.media[0].media_url_https) {
          tweetbody["image"] = tweet.entities.media[0].media_url_https;
        }
      } catch (err) {}
      tweetArray.push(tweetbody);
    });
    io.emit("allTweet", tweetArray);
  });

  const stream = T.stream("statuses/filter", {
    track: "#coding",
    language: "en",
  });

  stream.on("tweet", (tweet) => {
    io.emit("tweet", { tweet: tweet });
  });

  socket.on("disconnect", () => {});
});

// [Server Start]
http.listen(PORT, HOST, () => {
  console.log(`Server is up and running at ${HOST}:${PORT}`);
});
