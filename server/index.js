const {
    createUser,
    seedData
} = require("./db");

const bcrypt = require("bcrypt");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Server frontend
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
  app.use(
    "/assets",
    express.static(path.join(__dirname, "../client/dist/assets"))
  );
  // Fetch all users
app.get("/api/users", async (req, res, next) => {
    try {
      const users = await fetchUsers();
      res.json(users);
    } catch (ex) {
      next(ex);
    }
  });