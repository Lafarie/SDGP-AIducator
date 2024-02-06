import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import sql from "mysql2";

dotenv.config()

let INSTRUCTIONS = 
    `
    You are an AI assistant who is an expert in any field of education. 
    YOU WILL NOT answer anything outside the field of academic education. 
    Queries about history should be considered education, for example question about historical people and events in history. 
    YOU SHOULD NOT answer any personal issues or statements a user might give as a prompt.
    YOU SHOULD NOT give adivice to users if they ask any issues outside an acedemic sense.
    DO NOT GIVE HEADING TO QUESTIONS YOU ARE NOT ALLOWED TO ANSWER.
    If you are unable to provide an answer to a question, please respond with the phrase 
    "Sorry, but I am just an educational assistant I can only assist you in that manner."
    Please aim to be as helpful, creative, and friendly as possible in all of your responses.
    Do not use any external URLs in your answers. Do not refer to any blogs in your answers.
    Start every answer with proper heading for the prompt as a HTML heading. The heading must be enclosed with <h1></h1> tags.
    If you generate a response in point form then enclose the list in a <ul> tage and the points in <li> tags
    Format any lists on individual lines with a dash and a space in front of each item
    Add heading to question answered and have sections for the answers. 
    Give the answer as a paragraph in html and add section breaks and headings.
    IMPORTANT: EVERY PROPER RESPONSE MUST HAVE ATLEAST 2 SECTIONS AND 200 WORDS.
    `

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

var dbconnection = sql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "port": 3307
});

dbconnection.connect((err) => {
    if(err){
        console.log(err);
    } else {
        console.log("connected");
    }
})

let tablesql = "CREATE TABLE queryTable" + 
                "(id INTEGER NOT NULL AUTO_INCREMENT," + 
                "prompt VARCHAR(100) NOT NULL," + 
                "response VARCHAR(500) NOT NULL," + 
                "promptrating VARCHAR(10)," + 
                "CONSTRAINT q_id_pk PRIMARY KEY (id));"

dbconnection.query('CREATE DATABASE querydb', (err, result) => {
    if(err){
        if(err.errno === 1007){
            console.log("Database already exists, Storing data in existing database")
        } else {
            console.log(err);
        }
    } else {
        console.log("databse created")
    }
})

dbconnection.changeUser({"database": "querydb"}); // selecting databse after creation

dbconnection.query(tablesql, (err, result) => { // creating table
    if(err){
        if(err.errno === 1050){
            console.log("table already exists")
        }
    } else {
        console.log("table created successfully");
    }
});

async function main(input) {
  const completion = await openai.chat.completions.create({
    messages: [{"role" : "system", "content": INSTRUCTIONS}, {"role": "assistant", "content": input}],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0];
}

let app = new express;

app.use(bodyParser.json());

app.post("/api/get/prompt", async (req, res) => {
    console.log(req.body.prompt);
    if(req.body.prompt === ""){
        res.json({"generated_result": "I'm sorry but I have not recieved a proper question to answer."})
    } else {
        let returnMsg = main(req.body.prompt);
        let result = (await returnMsg).message;
        res.json({"generated_result": result.content})
    }
});

app.listen(5000, () => {
    console.log("listenning on port 5000.")
})
