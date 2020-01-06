DELETE FROM heloposts
WHERE post_id = $1;

SELECT * FROM heloposts
WHERE user_id = $2;
