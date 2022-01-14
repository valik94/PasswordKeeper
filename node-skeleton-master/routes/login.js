const express = require('express');
const res = require('express/lib/response');
const router  = express.Router();
const { emailExists, passwordValidator } = require("../helpers.js");

/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
 const cookieSession = require('cookie-session');
 app.use(cookieSession({
   name: 'session',
   keys: ['key1'],

   maxAge: 24 * 60 * 60 * 1000
 }));


module.exports = (db) => {

  // router.post("/", (req, res) => {
  //   res.render("dashboard");
  // });
  router.get('/', (req, res) => {
    const templateVars = { value: false };
    res.render("homepage", templateVars);
  })

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    const errors = {
      email: "Must provide email!",
      password: "Must provide password!",
      emailOrPwinvalid: "Email or Password is invalid!",
    }; //This is for the popup errors
    console.log('TEST: router.post', req.body);

    if (!email) {
      res.send(errors.email);
      return;
    } else if (!password) {
      res.send(errors.password);
      return;
    }

    /* promise chain that will first check if the users email exists against our db and then validate their password
     * async error handling for when a username or password is invalid will happen in here - TODO */
    let validUserEmail = emailExists(email, db);
    validUserEmail.then((value) => {

      if (!value) {
        res.send(errors.emailOrPwinvalid);
        throw new Error('email does not exist');
      } else {
        return passwordValidator(password, email, db);
      }
    }).then((value) => {

      if (!value) {
        res.send(errors.emailOrPwinvalid);
        throw new Error('password does not exist');
      } else {
        req.session.user_id = value;
        // res.render('dashboard')
        res.json({status: "Success", redirect: '/'});
      }
    }).catch(error => {
      console.log(error);
    });
  });

  return router;
  };
