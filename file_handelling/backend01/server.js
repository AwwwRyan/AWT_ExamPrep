const express = require("express");
const fs = require("fs");
const filedata = require("./data.json");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to write data to JSON file
const writeData = (data) => {
    fs.writeFile("./data.json", JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
};

// GET all users
app.get("/users", (req, res) => {
    return res.json(filedata);
});


// GET all users which have age greater than 20
app.get("/users/age", (req, res) => {
    const data = filedata.filter(u => u.age > 20);
    return res.json(data);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
    const user = filedata.find(u => u.id === parseInt(req.params.id));
    return res.json(user);
});

// CREATE new user
app.post("/users", (req, res) => {
    const data = filedata;

    const newUser = {
        id: data.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
    };

    data.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
    const data = filedata;
    const index = data.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    data[index] = {...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const data = filedata;
    const index = data.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = data.splice(index, 1)[0];
    writeData(data);
    res.json(deletedUser);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});