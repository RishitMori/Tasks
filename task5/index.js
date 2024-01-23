const express = require("express");
const path = require("path");
const app = express();
const users = require("./utils/user.json");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join("views"));

async function checkauth(req, res, next) {
  const user = req.cookies?.user;
  if (user) {
    return next();
  }
  return res.redirect("/login");
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", checkauth, function (req, res) {
  const user = req.cookies.user;
  res.render("user", { user: user });
});

app.get("/login", function (req, res) {
  res.render("home");
});
app.post("/login", async function (req, res, next) {
  const email = req.body.email;
  const pass = req.body.password;
  const name = req.body.name;
  console.log(email, "  ", pass);
  users.map((user, index) => {
    if (email === user.email && pass === user.password) {
      res.cookie("user", name);
      return res.redirect("/");
    }
  });
  return res.render("error");
});
app.listen(3000);
