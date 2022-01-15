# Getting Started

1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information

- username: labber
- password: labber
- database: midterm

3. Install dependencies: npm i
4. Fix to binaries for sass: npm rebuild node-sass
5. Reset database: npm run db:reset

6. Check the db folder to see what gets created and seeded in the SDB

7. Run the server: npm run local

- Note: nodemon is used, so you should not have to restart your server

8. Visit http://localhost:8080/

# PasswordKeeper

# User Stories

1. As a user I want to register/login and be assigned to an organization because I want to quickly select which passwords for which organizations I want to store safely.
2. An organization should be able to host many users.
3. As a user I should be able to add a new username and password for a specific website of any of the 3 following types: Banking/Financial (CIBC, RBC, WealthSimple, etc.) , Email/WorkEmail (gmail,outlook,etc) , Social Media (Facebook,Instagram, Twitter,etc.)
4. As a user I should also be able to generate passwords based on criteria that I can specify to match security password policy, including:

- password length
- contains lowercase characters
- contains uppercase characters
- contains numbers

5. As a user I can edit and change my stored passwords of any of my accounts for organization at any time.
6. As a user I have a button to copy the selected passwords for convenience and to avoid mistyping purposes.
7. As a user I can categorize my passwords as aforementioned into 1 of 3 categories social media, email/work and banking/financial to be able to organize my password storage needs.

# Dependencies

- "body-parser": "^1.19.0",
- "bootstrap": "^3.4.1",
- "chalk": "^2.4.2",
- "cookie-session": "^1.4.0",
- "dotenv": "^2.0.0",
- "ejs": "^2.6.2",
- "express": "^4.17.1",
- "generate-password": "^1.6.0",
- "jquery": "^3.5.1",
- "morgan": "^1.9.1",
- "node-sass-middleware": "^0.11.0",
- "pg": "^8.5.1",
- "pg-native": "^3.0.0"

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples.
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

# Git Workflow

NEVER code on Master or Main!

**Create Feature Branches**
git checkout -b feature/my-feature

**Main branch is your production branch, never directly work on it!**
Workflow

**Starting a new branch**

1. git checkout main (Start new branches from the main branch)
2. git pull (Make sure you have the most recent version)

**Working on the branch** 3. git checkout feature/my-feature (Make your feature) 4. git add & git commit (Commit often with meaningful messages !) 5. git push (So it's not only local)

**Merging main in the branch** 6. git checkout main (To update it) 7. git pull 8. git checkout feature/my-feature (Back to your feature) 9. git merge main 10. Fix conflicts if any 11. git commit (commit the merge) 12. git push (So it's not only local)

**Merging the branch back in main** 13. git checkout main (To merge your branch) 14. git merge feature/my-feature 15. Should not be any conflict since you cleaned them in the branch first 16. git commit (commit the merge) 17. git push (So it's not only local)
