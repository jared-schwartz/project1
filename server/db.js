const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/project1");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";


const createTables = async () => {
  const SQL = `  
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS flavors;

    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        photo_URL VARCHAR(255),
        is_admin BOOLEAN DEFAULT false
        );

    CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        description VARCHAR(500),
        photo_URL VARCHAR(255),
        average_Score REAL DEFAULT 5,
        disabled BOOLEAN DEFAULT false,
        price DECIMAL(10,2)
        );

    CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) NOT NULL,
        flavor_id INT REFERENCES flavors(id) NOT NULL,
        content VARCHAR(500),
        score INTEGER,
        UNIQUE (user_id, flavor_id)
        ;
        
    `;
  await client.query(SQL);
};

const seedData = async () => {
    await createSecureServer({
        username: "jared",
        password: "12345678",
        photo_URL: "",
        is_admin: true,
        firstname: "Jared",
        lastname: "schwartz",
    })
};

const createUser = async ({
    username, 
    password, 
    photo_URL, 
    is_admin, 
    firstname,
    lastname
}) => {
    const SQL = `
    INSERT into users(username, password, photo_URL, is_admin, firstname, lastname) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const response = await client.query(SQL [username, password, photo_URL, is_admin, firstname, lastname]);
    return response.rows[0];
}

module.exports ={
    createUser,
    seedData
};