package db

var schema = `
	CREATE TABLE IF NOT EXISTS restaurant (
	id SERIAL PRIMARY KEY,
	name VARCHAR UNIQUE,
	type VARCHAR,
	phone VARCHAR,
	location VARCHAR
);`
