UPDATE orders
SET internal_id = $2
, tax = $3
, final_total = $4
, open = $5
, user_id = $6
, ship_id = $7
, bill_id = $8
, ship_method = $9
WHERE id = $1
;