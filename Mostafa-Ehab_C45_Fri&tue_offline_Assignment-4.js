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



app.listen(port, () => {
    console.log("Server is running on port " + port);
});
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



//#region (3)-Get-By-Query
app.get("/",(req,res,next)=>{
    if(req.params == "/user/getByName?name=ali"){
        res.status(201).json({Msg:"done"});
    }else if (req.query == "/user/getByName?name=test"){
        res.status(409).json({message : "user name not found"});
    }
    return ;
});
// #endregion