const index = (req, res) => {
  res.render("index", { weatherText: "" });
};

export default index;
