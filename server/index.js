const express = require("express");
const compression = require("compression");
const path = require("path");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("../routes");

//Routes
const userProfileRoutes = require("./routes/userProfile");
const activityRoutes = require("./routes/activity");
const serviceRoutes = require("./routes/service");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require("./config");

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }
};

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Database Connected!"))
  .catch(err => console.error(err));

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.use(bodyParser.json());

    server.use("/api/v1/userProfiles", userProfileRoutes);
    server.use("/api/v1/activity", activityRoutes);
    server.use("/api/v1/service", serviceRoutes);

    server.get("/robots.txt", (req, res) => {
      return res.status(200).sendFile("robots.txt", robotsOptions);
    });

    server.get("*", (req, res, next) => {
      if(!dev && req.headers['x-forwarded-proto']!='https') {
        res.redirect('https://asam-burgos.herokuapp.com' + req.url);
      }
      next();
      return handle(req, res);
    });

    server.use(function(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res.status(401).send({
          title: "Unauthorized",
          detail: "Unauthorized Access!"
        });
      }
    });



    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, err => {
      if (err) throw err;
      console.log("> Ready on port " + PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
