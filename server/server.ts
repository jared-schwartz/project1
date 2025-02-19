import { Request, Response, NextFunction } from 'express';
import { User, FullUser, UserDetails } from './types';
import { selectAllProducts, selectUserById } from './db';
const {
    client,
    createTables,
    seedData,
    insertUser,
    selectAllUsers
} = require("./db");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(require('morgan')('dev'));

// Serve frontend
app.get("/", (req: Request, res: Response) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);
app.use(
    "/assets",
    express.static(path.join(__dirname, "../client/dist/assets"))
);

//---  Users API ---
//Making a user
app.post('/api/users', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const user = req.body.user;

        //Missing parts in the user field
        if (!user || !user.username || !user.firstname || !user.lastname || !user.email || !user.birthday || !user.password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        //Incorrect dating format
        if (isNaN(Date.parse(user.birthday))) {
            return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
        }
        await insertUser(user)
        return res.status(200).json({ "successs": "Success!" })

    } catch (error) {
        console.error("Server Error:", error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: "Invalid data type provided" });
        }

        if (typeof error === "object" && error !== null) {
            const err = error as { code?: string; message: string };

            if (err.code === "23505") {
                return res.status(409).json({ error: "User already exists" });
            }

            if (err.message.includes("DATABASE_ERROR")) {
                return res.status(500).json({ error: "Internal Database Error" });
            }
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
})
//Selecting all users
app.get('/api/users', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const response = await selectAllUsers()
        return res.status(200).json(response)

    } catch (error) {
        console.error("Server Error:", error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: "Invalid data type provided" });
        }

        if (typeof error === "object" && error !== null) {
            const err = error as { code?: string; message: string };

            if (err.message.includes("DATABASE_ERROR")) {
                return res.status(500).json({ error: "Internal Database Error" });
            }
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
})
//Selecting a user by their id
app.get('/api/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const response = await selectUserById(req.params.id)
        return res.status(200).json(response)

    } catch (error) {
        console.error("Server Error:", error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: "Invalid data type provided" });
        }

        if (typeof error === "object" && error !== null) {
            const err = error as { code?: string; message: string };

            if (err.message.includes("DATABASE_ERROR")) {
                return res.status(500).json({ error: "Internal Database Error" });
            }
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//--- Product API ---
//Selecting all products
app.get('/api/products', async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const response = await selectAllProducts();
        return res.status(200).json(response)

    } catch (error) {
        console.error("Server Error:", error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: "Invalid data type provided" });
        }

        if (typeof error === "object" && error !== null) {
            const err = error as { code?: string; message: string };

            if (err.message.includes("DATABASE_ERROR")) {
                return res.status(500).json({ error: "Internal Database Error" });
            }
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
})


//Selecting All Users
const init = async () => {
    try {
        //Connecting to data base
        const port = process.env.PORT || 3000;
        await client.connect();
        console.log('Connected to database :)')

        //Create tables
        await createTables();

        //Seeding Data
        await seedData();

        app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {

    }
};

init();