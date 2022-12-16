import homeRouter from "./home.js";
import storeRouter from "./store.js";
import userRouter from "./user.js";

const routes = (app) => {
  app.use("/home", homeRouter);
  app.use("/store", storeRouter);
  app.use("/user", userRouter);
};

export default routes;
