
-- SCHEMA DELETE
	DROP TABLE IF EXISTS users CASCADE;

-- SCHEMA
	-- Users
	CREATE TABLE IF NOT EXISTS users
	(
		id serial primary key
		, first_name varchar
        , last_name varchar
	);
	INSERT INTO users (first_name, last_name) VALUES ('Jodi', 'Parker');
