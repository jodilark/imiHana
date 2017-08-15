UPDATE sizes
SET orientation = $2
, width = $3
, height = $4
WHERE id = $1
;