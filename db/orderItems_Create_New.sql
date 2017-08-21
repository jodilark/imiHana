INSERT INTO order_items
(order_id, qty, pre_tax_total, item_id, mat_id, size_id)
VALUES($1, $2, $3, $4, $5, $6)
;