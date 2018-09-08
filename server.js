const express = require('express');
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json()); // for parsing application/json

const port = process.env.PORT || 5000;

app.post('/create-user', (req, res) => {
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