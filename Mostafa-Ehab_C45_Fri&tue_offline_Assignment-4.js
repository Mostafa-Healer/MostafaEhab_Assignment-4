const express = require("express");
const app = express();

const fs = require("node:fs");
const path = require("node:path");
const filepath = path.resolve( "./users.json");

const port = 3000;

app.use(express.json());


//#region (1)-post
let users = [
    {"user":"user2","age":30,"email":"user@gmail.com"}
];

app.post("/user",(req,res,next)=>{

    const userExist = users.find((val)=>{
        return val.user == req.body.user ;
    });

    if(userExist){
        return res.status(409).json({message:"user already exist"})
    }

    users.push(req.body);
    fs.writeFileSync(filepath,JSON.stringify(users));
    return res.status(201).json({message : "user added successfully"})
})




//#endregion




//#region (2)-patch
app.patch("/update/:id",(req,res,next)=>{
    if(req.params.id == 99){
        res.status(409).json({message : "user Id not found"});
    }

    res.status(200).json({message : "user aged updated successfully"});
    return ;
});
//#endregion




//#region (3)-Delete
app.delete("/delete{/:id}",(req,res,next)=>{
    if(req.params.id == 1){
        res.status(201).json({message : "user deleted successfully"});
    }else if (req.params.id == 99){
        res.status(409).json({message : "user Id not found"});
    }
    return ;
});
// #endregion



//#region (4)-Get-By-Query

app.get("/user/getByName", (req, res) => {
    const name = req.query.name;
    
    if (name === "ali") {
        res.status(201).json({id:1,name:"ali",age:27,email:"user@email.com" });
    } else if (name === "test") {
        res.status(409).json({ message: "user name not found" });
    } else {
        res.status(400).json({ message: "Invalid request" });
    }
});

// #endregion



//#region (5)-Get-all-user

app.get("", (req, res) => {
    const fileData =JSON.parse( fs.readFileSync(filepath,{encoding:"utf-8"}) );
    console.log(fileData);

    res.status(201).json(fileData);
    return ;
});

// #endregion



//#region (6)-FilterUsers-By-Minimumage

let userList = [
    {"id":1,"name":"ali","user":"user1","age":25,"email":"user1@email.com"},
    {"id":2,"name":"ahmed","user":"user2","age":30,"email":"user2@email.com"},
];

app.get("/user/filter", (req, res) => {

    const age = req.query.minage ;
    
    const FilteredUser = userList.filter((val)=>{
        return val.age >= age  ;
    });

    if(FilteredUser.length == 0){
        return res.status(404).json({message:"no user found"}) ;
    }
    return res.status(200).json(FilteredUser)

});

// #endregion

//#region (7)-Get-Users-By-ID
app.get("/user/:id", (req, res) => {
    const id = req.params.id ;
    const FilterId = userList.filter((val)=>{
        return val.id == id ;
    });

    if(FilterId.length == 0){
        return res.status(404).json({message:"user Id not found"}) ;
    }
    return res.status(200).json(FilterId);
    
});

// #endregion



app.listen(port, () => {
    console.log("Server is running on port " + port);
});