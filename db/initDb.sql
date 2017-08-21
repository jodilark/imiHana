-- SCHEMA DELETE
	DROP TABLE IF EXISTS users CASCADE;
	DROP TABLE IF EXISTS addresses CASCADE;
	DROP TABLE IF EXISTS states CASCADE;
	DROP TABLE IF EXISTS countries CASCADE;
	DROP TABLE IF EXISTS items CASCADE;
	DROP TABLE IF EXISTS orders CASCADE;
	DROP TABLE IF EXISTS order_items CASCADE;
	DROP TABLE IF EXISTS shipping_type CASCADE;
	DROP TABLE IF EXISTS item_materials CASCADE;
	DROP TABLE IF EXISTS item_sizes CASCADE;
	DROP TABLE IF EXISTS materials CASCADE;
	DROP TABLE IF EXISTS sizes CASCADE;

-- SCHEMA
	-- Users
		CREATE TABLE IF NOT EXISTS users
		(
			id serial primary key
			, first_name varchar
			, last_name varchar
			, auth_token varchar
			, phone varchar
			, email varchar
			, admin boolean
		);

	-- Addresses
		CREATE TABLE IF NOT EXISTS addresses
		(
			id serial primary key
			, address_1 varchar(500)
			, address_2 varchar(500)
			, city varchar
			, zip varchar
		);

	-- States
		CREATE TABLE IF NOT EXISTS states 
		(
			id serial primary key
			, code text
			, name text
		);
		
	-- Countries
		CREATE TABLE IF NOT EXISTS countries 
		(
			id serial primary key
			, code text
			, name text
		);

	-- Items
		CREATE TABLE IF NOT EXISTS items
		(
			id serial primary key
			, name varchar
			, description varchar(500)
			, price int
			, for_sale boolean
			, uri text
		);

	-- Orders
		CREATE TABLE IF NOT EXISTS orders
		(
			id serial primary key
			, internal_id varchar
			, tax real
			, final_total real
			, open boolean
		);

	-- Order Items
		CREATE TABLE IF NOT EXISTS order_items
		(
			id serial primary key
			, qty int
			, pre_tax_total real
		);

	-- Shipping Methods
		CREATE TABLE IF NOT EXISTS shipping_type
		(
			id serial primary key
			, type varchar
		);

	-- Item materials
		CREATE TABLE IF NOT EXISTS item_materials
		(
			id serial primary key
		);

	-- Item sizes
		CREATE TABLE IF NOT EXISTS item_sizes
		(
			id serial primary key
		);

	-- Materials
		CREATE TABLE IF NOT EXISTS materials
		(
			id serial primary key
			, type varchar
		);

	-- Sizes
		CREATE TABLE IF NOT EXISTS sizes
		(
			id serial primary key
			, orientation varchar
			, width real
			, height real
		);

	--add foreign keys
	-- UsersFK
		ALTER TABLE users
		add column d_ship_id integer references addresses (id)
		, add column d_bill_id integer references addresses (id)
		;
	
	-- AddressesFK
		ALTER TABLE addresses
		add column user_id integer references users (id)
		, add column state_id integer references states (id)
		, add column country_id integer references countries (id)
		;

	-- OrdersFK
		ALTER TABLE orders
		add column user_id integer references users (id)
		, add column ship_id integer references addresses (id)
		, add column bill_id integer references addresses (id)
		, add column ship_method integer references shipping_type (id)
		;

	-- OrderItemFK
		ALTER TABLE order_items
		add column order_id integer references orders (id)
		, add column item_id integer references items (id)
		, add column mat_id integer references materials (id)
		, add column size_id integer references sizes (id)
		;

	-- itemMatsFK	
		ALTER TABLE item_materials
		add column item_id integer references items (id)
		, add column mat_id integer references materials (id)
		;

	-- itemSizesFK	
		ALTER TABLE item_sizes
		add column item_id integer references items (id)
		, add column size_id integer references sizes (id)
		;

	