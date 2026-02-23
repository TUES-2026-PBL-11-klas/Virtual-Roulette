
INSERT INTO users (username, password)
VALUES ($1, $2)
RETURNING id, username, balance;



SELECT id, username, balance
FROM users
WHERE id = $1;


SELECT id, username, password, balance
FROM users
WHERE username = $1;


SET balance = $1
WHERE id = $2;

INSERT INTO bet (type, number, amount, user_id)
VALUES ($1, $2, $3, $4)
RETURNING id;


SELECT b.id, b.type, b.number, b.amount
FROM bet b
WHERE b.user_id = $1
ORDER BY b.id DESC;


SELECT b.id, b.type, b.number, b.amount
FROM bet b
WHERE b.user_id = $1
ORDER BY b.id DESC
LIMIT 1;

SELECT type, COUNT(*) AS bet_count
FROM bet
WHERE user_id = $1
GROUP BY type
ORDER BY bet_count DESC;

SELECT SUM(amount) AS total_spent
FROM bet
WHERE user_id = $1;