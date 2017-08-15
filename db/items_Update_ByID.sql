UPDATE items
SET name = $2
, description = $3
, price = $4
, for_sale = $5
, uri = $6
WHERE id = $1
;