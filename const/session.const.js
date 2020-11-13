const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

module.exports = session({
  secret: "sBrSpntpGjL7NqM",
  resave: true,
  saveUninitialized: true,
  name: "cheesedForSure",
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 5,
  },
  genid: () => {
    return uuidv4();
  },
});
