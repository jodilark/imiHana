INSERT INTO users
(id, auth_token, first_name, last_name, email, admin)
VALUES(DEFAULT, $1, $2, $3, $4, false)
RETURNING *;