-- Dummy Data
    --pop users
    INSERT INTO users (first_name, last_name, auth_token, phone, email, admin) VALUES ('Jodi', 'Parker', 'fakeAuth', '801-949-6842', 'jodilparker@gmail.com', true);

    --pop addresses
    INSERT INTO addresses
    (user_id, address_1, address_2, city, state_id, country_id, zip) VALUES (1, '6445 south Orange Sky Ct', '', 'West Jordan', 52, 1, '84081');
