
DROP TABLE IF EXISTS bet CASCADE;
DROP TABLE IF EXISTS users CASCADE;

--  @NotBlank        -> NOT NULL
--  @PositiveOrZero  -> CHECK (balance >= 0)

CREATE TABLE users (
    id       BIGSERIAL PRIMARY KEY,            
    username VARCHAR(255) NOT NULL UNIQUE,      
    password VARCHAR(255) NOT NULL,             
    balance  DOUBLE PRECISION NOT NULL          
                DEFAULT 10000                   
                CHECK (balance >= 0)
);

--  @ManyToOne User -> user_id REFERENCES users(id)

CREATE TABLE bet (
    id      BIGSERIAL PRIMARY KEY,                        
    type    VARCHAR(50) NOT NULL                            
                CHECK (type IN (
                    'STRAIGHT', 'SPLIT', 'STREET', 'CORNER',
                    'LINE', 'COLUMN', 'DOZEN',
                    'RED', 'BLACK', 'EVEN', 'ODD', 'LOW', 'HIGH'
                )),                                       
    number  INTEGER NOT NULL DEFAULT 0,                    
    amount  DOUBLE PRECISION NOT NULL                     
                CHECK (amount > 0),                        
    user_id BIGINT NOT NULL                                
                REFERENCES users(id)
                ON DELETE CASCADE                           
)