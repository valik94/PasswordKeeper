-- Drop and recreate users_organisations table
DROP TABLE IF EXISTS users_organisations CASCADE;

--This is a relationship table between users and organisations
CREATE TABLE users_organisations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  organisation_id INTEGER REFERENCES organisations(id) ON DELETE CASCADE
);
