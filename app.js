/////////////////////////////


// TODO
// OAUTH2
// Database


///////////////////////////////////


//pre config
require("dotenv").config();
require("./database/connection").connect().catch(err => {
  console.error(chalk.red(err.toString()));
});
require('./passport/passport');

//components
const chalk = require('chalk');
const config = require('./config.json');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressLayouts = require('express-ejs-layouts')
const cookieSession = require("cookie-session");
const compression = require('compression');
const app = express();
const compiler = require("./utils/compiler");
const PORT = parseInt(process.env.PORT, 10) || 3000;

const authRoute = require('./routes/auth');
const problemRoute = require('./routes/problem');
const dashboardRoute = require('./routes/dashboard');


//settings
app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractMetas", true);
app.set("layout extractStyles", true);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(expressLayouts);
app.use(compression());


app.use(
    cookieSession({
      maxAge: config.Cookies_Life,
      keys: [process.env.COOKIES_KEY || "AES-256"],
    })
);
app.use(passport.initialize(null));
app.use(passport.session(null));

//routers
app.use('/auth', authRoute);
app.use('/problem', problemRoute);
app.use('/dashboard', dashboardRoute);

//main routes
app.get("/", async (req, res) => {
  res.status(202);
  res.render("index", {
    title: "Home",
    output: "",
    user: req.user,
    username: req.user ? req.user.displayName : "Anonymous",
  });
});

app.post("/", async (req, res) => {
  let language = req.body.language;
  let script = req.body.script;
  let input = req.body.input || "";
  let { output, err } = await compiler(language, script, input);

  if(err){
    output = err;
  }
  res.status(202);
  res.render("index", {
    title: "Home",
    output,
    user: req.user,
    username: req.user ? req.user.displayName : "Anonymous",
  });
});


//------------------------------------------------------
//Not found! Route (Should be bottom of hierarchy)
app.get("*", (req, res) => {
  res.status(404);
  res.render("error", { title: "Error", statusCode: res.statusCode, errorText: null, errorDesc: null });
});
//------------------------------------------------------


//starting server
app.listen(PORT, () => {
  console.log(chalk.blue(`Server started on http://localhost:${PORT}/`));
});
