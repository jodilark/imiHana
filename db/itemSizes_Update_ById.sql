UPDATE item_sizes
SET item_id = $2
, size_id = $3
WHERE id = $1
;