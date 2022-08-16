export const checkForCityName = (req, res, next) => {
  const cityName = req.body.cityName;
  
  if (!cityName) {
    res.setHeader("Content-Type", "text/html");
    res.status(400);
    res.render("index", { weatherText: "city name can not be empty" });
    return;
  }
  next();
};
