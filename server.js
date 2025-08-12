const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(".")); // Serve HTML/CSS/JS

let users = [];
if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json", "utf8"));
}

// Register
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send("Missing fields");

    if (users.find(u => u.username === username)) {
        return res.status(400).send("User already exists");
    }

    users.push({ username, password, date: new Date() });
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    res.send("User registered successfully");
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).send("Invalid credentials");

    res.send("Login successful");
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
