require('dotenv').config();
const bcrypt = require("bcrypt");
const { Client } = require('pg');
const {
    createTablesSQL,
    usersData,
    productData
} = require("./seedData")

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

import {
    User, FullUser, UserDetails, Product
} from "./types";

//Seeding Data
const createTables = async () => {
    await client.query(createTablesSQL)
    console.log("Created Tables");
}
const seedData = async () => {
    try {
        for (const user of usersData) {
            console.log(user);
            await insertUser(user);  // Wait for each insertion to complete before moving on
        };
        console.log("User Data Seeded");
        for (const product of productData) {
            console.log(product);
            await insertProduct(product);  // Wait for each insertion to complete before moving on
        };
        console.log("Product Data Seeded");
    } catch (error) {
        throw new Error("DATABASE_ERROR: Cannot Seed data");
    }

}

//User SQL functions
async function insertUser(user: UserDetails) {
    try {
        const SQL = `
            INSERT INTO users (username, firstname, lastname, email, birthday, password, is_admin, photo_URL) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING id, username, photo_URL;
        `
        const response = await client.query(SQL, [
            user.username,
            user.firstname,
            user.lastname,
            user.email,
            user.birthday,
            await bcrypt.hash(user.password, 5),
            user.is_admin ?? false,
            user.photo_URL ?? 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='
        ]);
        if (response.rowCount <= 0) throw new Error("DATABASE ERROR: User could not be created")
        console.log(`inserted new user, ${user.username}, into the data `)
        return response.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

async function selectAllUsers(): Promise<[Omit<UserDetails, "password">]> {
    try {
        console.log("Selecting all users!")
        const SQL = `
            SELECT username, email, firstname, lastname, birthday, is_admin FROM users;
        `
        const response = await client.query(SQL)
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

async function selectUserById(id: String): Promise<[Omit<UserDetails, "password">]> {
    try {
        const SQL = `
            SELECT username, email, firstname, lastname, birthday, is_admin, photo_url FROM users where ID = $1;
        `
        const response = await client.query(SQL, [id])
        return response.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

async function insertProduct(product: Product): Promise<string> {
    try {
        const SQL = `
            INSERT INTO products (name, price, stock_left, photo_URL) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id;
        `;
        const response = await client.query(SQL, [
            product.name,
            product.price,
            product.stock_left,
            product.photo_URL || ""
        ]);
        return response.rows[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

async function selectAllProducts(): Promise<[Product]> {
    try {
        console.log("Selecting all users!")
        const SQL = `SELECT id, name, photo_URL, price, stock_left, created, last_updated FROM products;`
        const response = await client.query(SQL)
        return response.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

export {
    client,
    createTables,
    seedData,
    insertUser,
    selectAllUsers,
    selectUserById,
    insertProduct,
    selectAllProducts
} 