const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config')
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("SuccessFull connected to the databse");
}).catch(err => {
    console.log('Could not connect to the databse. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "welcome to node application" });
});

require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
    console.log("server is listenling on port 3000");
});