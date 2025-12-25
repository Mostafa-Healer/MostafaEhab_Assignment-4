const express = require("express");
const app = express();

const fs = require("node:fs");
const path = require("node:path");
const filepath = path.resolve( "./users.json");

const port = 3000;

app.use(express.json());



//#region (1)


let users = [];

if (fs.existsSync(filepath)) {
    users = JSON.parse(fs.readFileSync(filepath, "utf8"));
}

app.post("/AddUser", (req, res) => {


    fs.appendFileSync(filepath, JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ message: "Invalid Data" });
        }

        res.status(201).json({
            name: "user1", 
            age: 27, 
            email: "user@gmail.com",
            
        });
    });

    console.log(req.body);
    
});


app.listen(port, () => {
    console.log("Server is running on port " + port);
});
