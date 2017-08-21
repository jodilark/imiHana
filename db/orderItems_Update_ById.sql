UPDATE order_items
SET order_id = $2
, qty = $3
, pre_tax_total = $4
, item_id = $5
, mat_id = $6
, size_id = $7
WHERE id = $1
;