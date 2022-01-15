/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 * these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// include db module from dbConn.js
const express = require('express');
const passwordRouter = express.Router();
const generator = require('generate-password');
const app = express();
// const { db, Pool } = require('../db/dbConn');
const { isAuthenticated, getUserOrganisations, newPasswordToDatabase, getOrgIdFromName } = require("../helpers.js");

// require and use cookie session to store user ids for cookie sessions
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));
module.exports = (db) => {

/* get routes for password generator page
 * query to db for the current logged in user, and check what orginizations they are part of
 * send that information back to the client for the orginzation drop down menu to pick from */
passwordRouter.get("/", (req, res) => {
  const id = req.session.user_id;
  console.log('ID = ', id);
  isAuthenticated(id, db)
  .then((userId) => {
    if (!userId) {
      res.redirect('/login');
    }
    console.log('USERID = ', userId);
    return getUserOrganisations(userId, db);
  })
  .then((usersOrgs) => {
    console.log("USERSORGS", usersOrgs);
    const organisations = [...usersOrgs];
    const templateVars = { value: id, organisations };
    res.render("password_gen", templateVars);
  }).catch(error => {
    console.log(error);
  });
});

// POSTS routes - TODO - take in db here - TEST
passwordRouter.post("/", (req, res) => {
  const id = req.session.user_id;

  if (req.body.length) {
  const passwordGenerator = function () {

    if (req.body.uppercase === 'true') {
      uppercaseBoolean = true;
    } else if (req.body.uppercase === 'false') {
      uppercaseBoolean = false;
    }

    if (req.body.lowercase === 'true') {
      lowercaseBoolean = true;
    } else if (req.body.lowercase === 'false') {
      lowercaseBoolean = false;
    }

    if (req.body.symbols === 'true') {
      symbolsBoolean = true;
    } else if (req.body.symbols=== 'false') {
      symbolsBoolean = false;
    }

    if (req.body.numbers === 'true') {
      numbersBoolean = true;
    } else if (req.body.numbers === 'false') {
      numbersBoolean = false;
    }

    return password = generator.generate({
      length: req.body.length,
      numbers: numbersBoolean,
      uppercase: uppercaseBoolean,
      lowercase: lowercaseBoolean,
      symbols: symbolsBoolean
    });
  };

  const thePassword = passwordGenerator();
  console.log("thepassword? ", thePassword);
  console.log("REQ.BODY", req.body);
  getOrgIdFromName(req.body.organisationName, db)
    .then((val) => {
      const orgId = val;
      newPasswordToDatabase(req.body.organisationName, id, orgId, req.body.category, req.body.url, thePassword, db);
      res.send('This worked!');
    });
  } else {
    getOrgIdFromName(req.body.organisationName, db)
    .then((val) => {
      const orgId = val;
      newPasswordToDatabase(req.body.organisationName, id, orgId, req.body.category, req.body.url, req.body.password, db);
      res.send('This also worked! You can submit your own password');
    });
  }
});
return passwordRouter;
}
// export whole router
// module.exports = passwordRouter;
