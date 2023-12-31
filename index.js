const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
     users: [
          {
               id: "12",
               name: "John",
               email: "john@example.com",
               password: "12",
               entries: 0,
               joined: new Date()
          },
          {
               id: "13",
               name: "Ponta",
               email: "ponta@example.com",
               password: "ponta123",
               entries: 0,
               joined: new Date()
          }
     ]
}
app.get("/", (req, res) => {
     res.json(database);
})

app.post("/signin", (req, res) => {
     if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
          // res.json("success");
          res.json(database.users[0]);
     }
     else {
          res.status(400).json("login failed!");
     }
})

app.post("/register", (req, res) => {
     // bcrypt.hash("bacon", null, null, function (err, hash) {
     //      // Store hash in your password DB.
     // });

     // // Load hash from your password DB.
     // bcrypt.compare("bacon", hash, function (err, res) {
     //      // res == true
     // });

     const { email, password, name } = req.body;
     database.users.push(
          {
               id: "14",
               name: name,
               email: email,
               entries: 0,
               joined: new Date()
          }
     )
     res.json(database.users[database.users.length - 1]);
})

// get user profile information
app.get("/profile/:id", (req, res) => {
     const id = req.params.id;
     let found = false;
     database.users.forEach(user => {
          if(user.id === id) {
               found = true;
               return res.json(user);
          }
     })
     if(!found) res.status(400).json("User not found! ") ;
})

// update user entries when user submitted images
app.put("/image", (req, res) => {
     const id = req.body.id;
     let found = false;
     database.users.forEach(user => {
          if (user.id === id) {
               found = true;
               user.entries++;
               return res.json(user.entries);
          }
     })
     if (!found) res.status(400).json("User not found! ");
})

app.listen(3000, () => console.log("My server is running at the PORT: 3000!"));