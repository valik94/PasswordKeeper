
/* helper function to check if a users email address already exists in our database - FIXED!
 * return a promise with false inside it if no userId exists */
const emailExists = function (userEmail, db) {
  const query = `
      SELECT email
      FROM users
      WHERE email = '${userEmail}';
    `
  return db.query(query)
    .then(res => {

      // if email not found in db, res.rows.length === 0, we catch this
      if (res.rows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

// helper function that takes in req.body.email as "userEmail" and the users object, added hashing! much security! - WORKS!
const passwordValidator = function (userPassword, userEmail, db) {

  const query = `
     SELECT id, master_password
     FROM users
     WHERE email = '${userEmail}';
    `

  return db.query(query)
    .then(res => {

      if (res.rows[0].master_password === userPassword) {
        return res.rows[0].id;
      } else {
        return false;
      }
    });
};

/* helper function that will determine if a user is authorized to be logged in or not
 * queries our db with the, return a promise with a false value if no userId exists */
const isAuthenticated = function (userId, db) {

  if (userId) {
    const query = `
    SELECT id
    FROM users
    WHERE id = ${userId}
    `;

    return db.query(query)
      .then(res => {

        if (res.rows.length === 0) {
          return false;
        } else {
          return res.rows[0].id;
        }
      });
  }

  return Promise.resolve(false);
};

// helper function to get all passwords by a userID and render it to the index page client side eventually
const getPasswordsbyUsers = function (userId, db) {

  if (userId) {
    const query = `
    SELECT url, password_text, category, passwords.id, user_id, organisation_id, organisations.name
    FROM passwords
    JOIN organisations ON organisations.id = passwords.organisation_id
    WHERE passwords.user_id = ${userId} OR passwords.organisation_id IN (SELECT organisation_id FROM users_organisations WHERE user_id = ${userId});
    `;
    return db.query(query)
      .then(res => {
        return res.rows;
      })
  }

  return Promise.resolve(false);
};

// helper function to delete password from the database when passed the button id. The button id should match the password primary key.
const deletePasswordFromDb = function (buttonId, db) {
  const query = `
    DELETE FROM passwords
    WHERE passwords.id = ${buttonId}
  ;
  `
  return db.query(query);

}

// helper function to edit password from the database when passed the button id. The button id should match the password primary key.
const editPasswordFromDb = function (buttonId, newPassword, db) {
  const query = `
    UPDATE passwords
    SET password_text = '${newPassword}'
    WHERE id = ${buttonId}
  ;
  `
  return db.query(query);
}

// helper function to retrieve new password
const getEditedPassword = function (buttonId, db) {
  const query =  `
    SELECT password_text
    FROM passwords
    WHERE id = ${buttonId}
    ;
  `
  return db.query(query);
}

// helper function to get organisations for a user to populate the org dropdown box when they make a password
const getUserOrganisations = function (userId, db) {
  const query = `
  SELECT DISTINCT organisations.name AS name
  FROM organisations
  JOIN users_organisations ON organisations.id = users_organisations.organisation_id
  WHERE user_id = ${userId};
  `
  return db.query(query)
    .then(res => {
      return res.rows;
    });
};

//will be used to enter a new login/password to the database
const newPasswordToDatabase = function (orgName, userId, orgId, category, url, password_text, db) {
  db.query(`SELECT id FROM organisations WHERE organisations.name = '${orgName}';`)
  const query =`
  INSERT INTO passwords (user_id, organisation_id, category, url, password_text)
  VALUES (${userId}, ${orgId}, '${category}', '${url}', '${password_text}');
  `;
  return db.query(query);
};

const getOrgIdFromName = function (name, db) {
  const query = `
  SELECT id
  FROM organisations
  WHERE organisations.name = '${name}';
  `
  return db.query(query)
    .then(res => {
      console.log('RESULT OF ORG ID FROM NAME: ', res.rows[0])
      return res.rows[0].id;
    });
}

/* https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 * sorts the array that later renders the dom elements by the url alpabetically */
const sortUserPasswords = function (userPasswordArr, db) {
  return userPasswordArr.sort((a, b) => {
    if (a.url < b.url){
      return -1;
    }
    if (a.url > b.url){
      return 1;
    }
    return 0;
  });
};

// export these helper functions to where they are needed
module.exports = {
  emailExists,
  passwordValidator,
  isAuthenticated,
  getPasswordsbyUsers,
  getUserOrganisations,
  deletePasswordFromDb,
  editPasswordFromDb,
  getEditedPassword,
  sortUserPasswords,
  newPasswordToDatabase,
  getOrgIdFromName
 };
