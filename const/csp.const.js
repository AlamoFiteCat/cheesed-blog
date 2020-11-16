module.exports = (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-src 'self' https://www.youtube.com/;img-src 'self' https://openweathermap.org/ https://pbs.twimg.com/;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
  );

  if (req.method === "OPTIONS") {
    res.status(200).json({});
  } else {
    next();
  }
};
