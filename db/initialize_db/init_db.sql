-- SCHEMA DELETE
	DROP TABLE IF EXISTS users CASCADE;

-- SCHEMA
	-- Users
	CREATE TABLE IF NOT EXISTS users
	(
		id serial primary key
		, first_name varchar
        , last_name varchar
		, auth_token varchar
	);
	INSERT INTO users (first_name, last_name, auth_token) VALUES ('Jodi', 'Parker', 'fakeAuth');
