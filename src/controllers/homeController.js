export const homeController = (req, res) => {
  res.render("home");
};

export const homeDetailsController = (req, res) => {
  res.send("home details");
};
