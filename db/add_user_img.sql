INSERT INTO heloposts (title, imgurl, content, user_id)
VALUES ($1, $2, $3, $4);
SELECT * FROM heloposts
WHERE user_id = $4;