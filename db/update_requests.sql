UPDATE helo SET requests = $1
WHERE user_id = $2;

SELECT requests FROM helo WHERE user_id = $2  