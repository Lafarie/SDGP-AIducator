import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import sql from "mysql2";
import nodeFetch from "node-fetch"

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
    IMPORTANT: Keep responses to a maximum of 5000 words or less. 
    `

const moderationUrl = 'https://api.openai.com/v1/moderations'; // Open AI moderation URL

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

var dbconnection = sql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "port": 3307
});


function pingdb() { // t
    var sql_keep = `SELECT 1 + 1 AS solution`; 
    dbconnection.query(sql_keep, function (err, result) {
      if (err) throw err;
    });
  }
  setInterval(pingdb, 40000);

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
                "response VARCHAR(5000) NOT NULL," + 
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

app.post("/post/prompt", async (req, res) => {
    console.log(req.body.prompt); // remove later
    if(req.body.prompt === ""){
        res.json({"generated_result": "I'm sorry but I have not recieved a proper question."})
    } else {
        fetch(moderationUrl, {
            method: "POST",
            headers: {'Content-Type':"application/json", 'Authorization': `Bearer ${process.env.API_KEY}`},
            body: JSON.stringify({input: req.body.prompt})
        }).then(response => response.json()).then(async data => {
            if(!data.results[0].flagged){
                let returnMsg = main(req.body.prompt);
                let result = (await returnMsg).message;
                res.json({"flagged":false, "generated_result": result.content})
            } else {
                res.json({"flagged": true, "generated_result": data.results[0].categories})
            }
        })
        // let returnMsg = main(req.body.prompt);
        // let result = (await returnMsg).message;
        // res.json({"generated_result": result.content})
        // setTimeout(() => {
        //     res.json({"generated_result": "<h1>hello</h1>"})
        // }, 5000);
    }
});

app.post("/post/save", async (req, res) => {
    console.log(req.body.rating); // remove later
    dbconnection.query(`INSERT INTO querytable(prompt, response, promptrating) VALUES("${req.body.prompt}", '${req.body.response.replaceAll("'", "*")}', "${req.body.rating}");`, (err, result) => {
        if(err){
            console.log(err)
            res.json({"message": "could no save conversation", "id": "-1"})
        } else {
            console.log("saved")
            dbconnection.query('SELECT id FROM queryTable ORDER BY id DESC LIMIT 1', (err, result) => { // to get the id of the last entry
                if(err){
                    console.log("Error")
                }else{
                    res.json({"message": "response saved", "id": result[0].id})
                }
            })
        }
    });
});

app.get("/get/responses", (req, res) => {
    dbconnection.query("SELECT id, prompt, promptrating FROM querytable", (err, result) => {
        if(err){
            console.log("Could not get responses")
        } else {
            res.json({"responseArray": result})
        }
    })
})

app.post("/post/unsave", async (req, res) => {
    let deleteID = req.body.unsaveID;
    console.log(deleteID) // delete later
    let deleteQuery = `DELETE FROM querytable WHERE (id = ${deleteID});`
    dbconnection.query(deleteQuery, (err, result) => {
        if(err) {
            res.json({"message":"Response could not be unsaved"})
            console.log("Response could not be unsaved")
        } else {
            res.json({"message":"Response unsaved"})
            console.log("Response unsaved")
        }
    })
});

app.post("/post/displaySaved", (req, res) => {
    console.log(req.body.selectedID); // delete later
    dbconnection.query(`SELECT response FROM querytable WHERE id = ${req.body.selectedID}`, (err, result) => {
        if(err){
            res.json({message: "response could not be found"})
        } else {
            res.json({message: result[0].response})
        }
    })
})

app.listen(5000, () => {
    console.log("listenning on port 5000.")
})
