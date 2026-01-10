CREATE DATABASE trip_splitter

CREATE TABLE trips(
  trip_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  target_currency VARCHAR(3)
)
