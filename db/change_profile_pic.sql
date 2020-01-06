UPDATE helo
SET profilepic = $2
WHERE user_id = $1;

SELECT * FROM helo
WHERE user_id = $1;