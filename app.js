require("dotenv").config();
require("./helpers/hbs"); // utils for hbs templates
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var dev_mode = false;

// var moment = require("handlebars-helper-moment")

const hbs = require("hbs");
const flash = require("connect-flash");


var app = express();

const mongoose = require("mongoose");

require("./config/mongodb"); // database initial setup
// base dependencies

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

// import de middlewares customs
if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // active le mode dev pour éviter les deconnexions
  app.use(require("./middlewares/debugSessionInfos")); // affiche le contenu de la session
}
app.use(require("./middlewares/exposeLoginStatus")); // expose le status de connexion aux templates

// view engine setup
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(__dirname + "/views/partials");
// hbs.registerDashboard(__dirname + "/views/dashboard");

app.set("view engine", "hbs");

app.use(cors("*")); //toujours avant les use des routes
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use("handlebars-helper-moment")

// config des message flash, important :doit être déclarée après la config de la session
app.use(flash());

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/maraude", require("./routes/maraude"));
app.use("/auth", require("./routes/auth")); // ici on use et appel le auth 
app.use("/dashboard", require("./routes/dashboard"));
// app.use("/home", require("./routes/home"));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;