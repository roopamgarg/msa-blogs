const express = require("express");
const {randomBytes} = require("crypto")
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

const posts = {};

app.get('/posts', (req,res) => {
    res.send(posts);
});

app.post('/posts', async (req,res) => {
    const id = randomBytes(4).toString("hex");
    const {title} = req.body;

    posts[id] = {id, title};

    
    await axios.post("http://event-bus-srv:4005/events", {
        type:"PostCreated",
        data: posts[id]
    })
    res.status(201).send(posts[id]);
});

app.post('/events', async (req,res) => {
    console.log("Received Event",req.body.type);
    res.send({})
})

app.listen(PORT, () => {
    console.log("V21");
    console.log("Server is running at http://localhost:" + PORT);
})