UPDATE shipping_type
SET type = $2
WHERE id = $1
;