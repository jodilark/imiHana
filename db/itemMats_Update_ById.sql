UPDATE item_materials
SET item_id = $2
, mat_id = $3
WHERE id = $1
;