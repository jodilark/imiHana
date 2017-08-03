INSERT INTO users
(id, auth_token, first_name)
VALUES(DEFAULT, $1, $2)
RETURNING *;