const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json()); // for parsing application/json

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/user-manager");

const userSchema = new mongoose.Schema({
    userId: Number,
    userName: String,
    userEmail: String
});

const User = mongoose.model("User", userSchema);

app.post('/create-user', (req, res) => {
    var newUser = new User(req.body);
    newUser.save()
        .then(item => {
            res.send({message: "Name saved to database"});
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get('/list-users', (req, res) => {
    console.log(User.find().exec(function (err, users) {
        if (err) return handleError(err);
        res.send(users)
        // prints "The author is Bob Smith"
    }))
});


app.post('/delete-user', (req, res) => {
    console.log(req.body.userName)
    if (req.body.userName === 'ErrorTrigger') {
        res.status(400).send({message: 'Something went wrong :(!'});
        return
    }
    res.send({ message: `${req.body.userName} deleted!` });
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Listening on port ${port}`));