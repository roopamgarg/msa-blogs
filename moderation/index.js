const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const PORT = 4003;
const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
    const {type, data} = req.body;

    if(type === "CommentCreated") {
        const status = data.content.includes("orange") ? "REJECTED": "APPROVED";
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentModerated",
            data: {
                ...data,
                status
            }
        })
    }
    res.send({});
})

app.listen(PORT, function(){
    
  console.log("Listening on port " + PORT);
})