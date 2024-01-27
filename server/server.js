import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

let app = new express;

app.use(bodyParser.json());

app.post("/api/get/prompt", (req, res) => {
    console.log(req.body);
    res.json({"message": "prompt recived successfully"})
});

app.listen(5000, () => {
    console.log("listenning on port 5000.")
})
