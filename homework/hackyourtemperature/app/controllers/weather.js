import fetch from "node-fetch";

const search = async (req, res) => {
  const cityName = req.body.cityName;

  try {
    const url = new URL(process.env.WEATHER_ENDPOINT);

    url.searchParams.append("appid", process.env.API_KEY);
    url.searchParams.append("q", cityName);
    url.searchParams.append("units", "metric");

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.setHeader("Content-Type", "text/html");
      res.render("index", {
        weatherText: `The temperature in ${data.name}: ${data.main.temp}°C`,
      });
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.log(err.message);
    res.status(err.message === "city not found" ? 404 : 500);
    res.setHeader("Content-Type", "text/html");
    res.render("index", {
      weatherText:
        err.message || "Oops! Something went wrong, try again later, please..",
    });
  }
};

export default search;
