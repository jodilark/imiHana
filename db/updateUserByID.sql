UPDATE users
SET first_name = $2
, last_name = $3
, phone = $4
, email = $5
, d_ship_id = $6
, d_bill_id = $7
, admin = $8
WHERE id = $1
;