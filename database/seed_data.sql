
INSERT INTO users (username, password, balance) VALUES
    ('test_kalin',   'hashed_pass_1', 10000),  
    ('test_petar',   'hashed_pass_2',  5000),  
    ('test_ivan',    'hashed_pass_3',     0);  



INSERT INTO bet (type, number, amount, user_id) VALUES
    ('STRAIGHT', 7,   100, 1),   
    ('RED',      0,   200, 1),   
    ('BLACK',    0,   150, 1),   
    ('EVEN',     0,    50, 1),   
    ('ODD',      0,    50, 1),   
    ('LOW',      0,   300, 1),  
    ('HIGH',     0,   300, 2),  
    ('COLUMN',   0,   100, 2),
    ('DOZEN',    0,   100, 2);

