const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const app = express()
const port = 3000

//connect mongodb database 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.use(bodyParser.json());

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //console.log("Database Connected!");
    var dbo = db.db("TestTest");


    }
);

app.post('/hello', (req, res) =>{
  console.log(  req.body,"body");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database Connected!");
        var dbo = db.db("TestTest");
        //retrieve entered username and password 
        var search = req.body.username;
        var search2 = req.body.password;
        dbo.collection("users").findOne(
            { key: search}, function(err, result)
            {
            if (err) throw err;
            //check if username was found
            if(result !== null)
            {
                //compare entered password with hashed password in database 
                if(bcrypt.compareSync(search2, result.address))
                {
                res.json({msg:"Successfully logged in"})
            }else{
                res.json({msg:"Wrong Password"})
            }
        }else{
            res.json({msg:"NOt Found"})
        }
            // console.log( result);
        db.close();
      });
    
        }
    );
} 
  )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))






////To setup database 
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
    //db.close();
//     let hash1 = bcrypt.hashSync('1234', 10)
//     let hash2 = bcrypt.hashSync('5678', 10)
//     let hash3 = bcrypt.hashSync('1111', 10)
//     var obj = [
//         {key: 'Salma', address: hash1},
//         {key: 'Somaa', address: hash2},
//         {key: 'intern', address: hash3}
//     ];
//     dbo.collection("users").insertMany(obj, function(err, res){
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//     db.close();
//   });
