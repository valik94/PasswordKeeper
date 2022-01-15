DROP TABLE IF EXISTS passwords CASCADE;
DROP TABLE IF EXISTS widgets CASCADE;

CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  organisations_id INTEGER REFERENCES organisations(id) ON DELETE CASCADE,
  category VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  password_text VARCHAR(255) NOT NULL
);
