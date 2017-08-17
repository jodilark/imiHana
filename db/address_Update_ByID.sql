UPDATE addresses
SET address_1 = $2
, address_2 = $3
, city = $4
, zip = $5
, state_id = $6
, country_id = $7
WHERE id = $1
;