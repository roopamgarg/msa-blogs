const express = require("express");
const {randomBytes} = require("crypto")
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4001;

const commentsByPostId = {};

app.get('/posts/:id/comment', (req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comment', async (req,res) => {
    const commentId = randomBytes(4).toString("hex");
    const {content} = req.body;
    comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id : commentId, 
        content,
        status: "PENDING"
    });
    commentsByPostId[req.params.id] = comments
    await axios.post("http://event-bus-srv:4005/events", {
        type:"CommentCreated",
        data:{
            id : commentId, 
            postId: req.params.id,
            content,
            status: "PENDING"

        }
    })
    res.status(201).send(commentsByPostId[req.params.id]);
});


app.post('/events', async (req,res) => {
    console.log("Received Event",req.body.type);
    const {type, data} = req.body;
    if(type === "CommentModerated"){
        const {postId, id, status, content} = data
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id == id);
        comment.status = status;
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id, status, postId, content
            }
        })
        
    }

    res.send({})
})

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
})