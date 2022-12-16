export const storeController = (req, res) => {
  res.render("store", {
    isShow: false,
    helpers: {
      message() {
        return "MESSAGE!";
      },
      notify() {
        return "NOTIFY!";
      },
    },
  });
};
