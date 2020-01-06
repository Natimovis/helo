UPDATE heloposts
SET title = $3, imgurl=$4, content=$5
WHERE post_id = $1;

SELECT * FROM heloposts
WHERE user_id = $2;