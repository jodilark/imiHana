INSERT INTO orders
(internal_id, tax, final_total, open, user_id, ship_id, bill_id, ship_method)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
;