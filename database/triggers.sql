
CREATE OR REPLACE FUNCTION check_balance_before_bet()
RETURNS TRIGGER AS $$
DECLARE
    current_balance DOUBLE PRECISION;
BEGIN
    
    SELECT balance INTO current_balance
    FROM users
    WHERE id = NEW.user_id;


    IF current_balance < NEW.amount THEN
        RAISE EXCEPTION 'unsuffiecient funds. balance: %, bet: %',
            current_balance, NEW.amount;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_balance_on_bet
BEFORE INSERT ON bet
FOR EACH ROW
EXECUTE FUNCTION check_balance_before_bet();

CREATE OR REPLACE FUNCTION validate_straight_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'STRAIGHT' THEN
        IF NEW.number < 0 OR NEW.number > 36 THEN
            RAISE EXCEPTION 'STRAIGHT bet - whole number between 0-36 result: %', NEW.number;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_straight_bet_number
BEFORE INSERT ON bet
FOR EACH ROW
EXECUTE FUNCTION validate_straight_number();