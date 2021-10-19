//pre config
require("dotenv").config();
require("./database/connection").connect().catch(err => {
  console.error(chalk.red(err.toString()));
});
require('./passport/passport');


// require('./utils/queAnsManager');

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
const compiler = require("./utils/compiler");

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const questionsRoute = require('./routes/questions');
const prepareRoute = require('./routes/prepare');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

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

//cookie-session settings
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
app.use('/dashboard', dashboardRoute);
app.use('/questions', questionsRoute);
app.use('/prepare', prepareRoute);

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



app.get("/test", async (req, res) => {
  res.status(202);
  res.render("test", {
    title: "Test",
    output: "",
    user: req.user,
    username: req.user ? req.user.displayName : "Anonymous",
  });
});

app.post("/test", async (req, res) => {
  let language = req.body.language;
  let script = req.body.script;
  let input = req.body.input || "";
  let { output, err } = await compiler(language, script, input);

  if(err){
    output = err;
  }
  res.status(202);
  res.render("test", {
    title: "Test",
    output,
    user: req.user,
    username: req.user ? req.user.displayName : "Anonymous",
  });
});

app.get('/developers', (req, res) => {
  res.status(202).render('developers');
});


//------------------------------------------------------
//Not found! Route (Should be bottom of hierarchy)
app.get("*", (req, res) => {
  res.status(404);
  res.render("error", { title: "Error", statusCode: res.statusCode, errorText: null, errorDesc: null, user: req.user });
});
//------------------------------------------------------


//starting server
app.listen(PORT, () => {
  console.log(chalk.blue(`Server started on http://localhost:${PORT}/`));
});
