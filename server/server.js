import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import sql from "mysql2";
// const fetch = require("node-fetch");

dotenv.config();

let INSTRUCTIONS = `
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
    `;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

var dbconnection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
});

function pingdb() {
  // t
  var sql_keep = `SELECT 1 + 1 AS solution`;
  dbconnection.query(sql_keep, function (err, result) {
    if (err) throw err;
  });
}
setInterval(pingdb, 40000);

dbconnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

const forumsql = `CREATE TABLE Forums (
  ForumID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100),
  Description TEXT)`;

const threadsql = `CREATE TABLE Threads (
  ThreadID INT PRIMARY KEY AUTO_INCREMENT,
  ForumID INT NOT NULL,
  UserID INT NOT NULL,
  Title VARCHAR(255) NOT NULL,
  CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Views INT DEFAULT 0,
  Content TEXT NOT NULL,
  UpVotes INT DEFAULT 0,
  DownVotes INT DEFAULT 0,
  Tag VARCHAR(255)
);`;

const postsql = `CREATE TABLE Posts (
  PostID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT NOT NULL,
  ThreadID INT NOT NULL,
  Content TEXT NOT NULL,
  CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpVotes INT DEFAULT 0,
  DownVotes INT DEFAULT 0,
  Tag VARCHAR(255)
);`;

const usersql = `CREATE TABLE Users (
        UserID INT PRIMARY KEY AUTO_INCREMENT,
        Username VARCHAR(50),
        Email VARCHAR(100),
        Password VARCHAR(100),
        RegistrationDate TIMESTAMP)`;

const postVotesql = `CREATE TABLE PostVoteTracking (
  VoteID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT NOT NULL,
  PostID INT NOT NULL,
  VoteType ENUM('UpVote', 'DownVote') NOT NULL,
  VotedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (PostID) REFERENCES Posts(PostID)
);`;

const threadVotesql = `CREATE TABLE ThreadVoteTracking (
  VoteID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT NOT NULL,
  ThreadID INT NOT NULL,
  VoteType ENUM('UpVote', 'DownVote') NOT NULL,
  VotedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ThreadID) REFERENCES Threads(ThreadID)
);`;

let tablesql =
  "CREATE TABLE queryTable" +
  "(id INTEGER NOT NULL AUTO_INCREMENT," +
  "prompt VARCHAR(100) NOT NULL," +
  "response VARCHAR(5000) NOT NULL," +
  "promptrating VARCHAR(10)," +
  "CONSTRAINT q_id_pk PRIMARY KEY (id));";

dbconnection.query("CREATE DATABASE AIducator", (err, result) => {
  if (err) {
    if (err.errno === 1007) {
      console.log("Database already exists, Storing data in existing database");
    } else {
      console.log(err);
    }
  } else {
    console.log("databse created");
  }
});

dbconnection.changeUser({ database: "AIducator" }); // selecting databse after creation

// Execute SQL queries to create tables - sathindu
dbconnection.query(tablesql, (err, result) => {
  // creating table
  if (err) {
    if (err.errno === 1050) {
      console.log("query table already exists");
    }
  } else {
    console.log("query table created successfully");
  }
});

// Execute SQL queries to create tables
dbconnection.query(usersql, (err, results) => {
  if (err) {
    if (err.errno === 1050) {
      console.log("users table already exists");
    }
  } else {
    console.log("users table created successfully");
  }
});

dbconnection.query(threadsql, (err, results) => {
  if (err) {
    if (err.errno === 1050) {
      console.log("thread table already exists");
    }
  } else {
    console.log("thread table created successfully");
  }
});

dbconnection.query(postsql, (err, results) => {
  if (err) {
    if (err.errno === 1050) {
      console.log("post table already exists");
    }
  } else {
    console.log("post table created successfully");
  }
});

dbconnection.query(postVotesql, (err, results) => {
  if (err) {
    if (err.errno === 1050) {
      console.log("postVote table already exists");
    }
  } else {
    console.log("postVote table created successfully");
  }
});

dbconnection.query(threadVotesql, (err, results) => {
  if (err) {
    if (err.errno === 1050) {
      console.log("threadVote table already exists");
    }
  } else {
    console.log("threadVote table created successfully");
  }
});

async function main(input) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: INSTRUCTIONS },
      { role: "assistant", content: input },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0];
}

let app = new express();

app.use(bodyParser.json());

app.post("/post/prompt", async (req, res) => {
  console.log(req.body.prompt); // remove later
  if (req.body.prompt === "") {
    res.json({
      generated_result: "I'm sorry but I have not recieved a proper question.",
    });
  } else {
    let returnMsg = main(req.body.prompt);
    let result = (await returnMsg).message;
    res.json({ generated_result: result.content });
    // setTimeout(() => {
    //     res.json({"generated_result": "<h1>hello</h1>"})
    // }, 5000);
  }
});

app.post("/post/save", async (req, res) => {
  console.log(req.body.rating); // remove later
  dbconnection.query(
    `INSERT INTO querytable(prompt, response, promptrating) VALUES("${
      req.body.prompt
    }", '${req.body.response.replaceAll("'", "*")}', "${req.body.rating}");`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "could no save conversation", id: "-1" });
      } else {
        console.log("saved");
        dbconnection.query(
          "SELECT id FROM queryTable ORDER BY id DESC LIMIT 1",
          (err, result) => {
            // to get the id of the last entry
            if (err) {
              console.log("Error");
              // } else {
              res.json({ message: "response saved", id: result[0].id });
            }
          }
        );
      }
    }
  );
});

app.get("/get/responses", (req, res) => {
  dbconnection.query(
    "SELECT id, prompt, promptrating FROM querytable",
    (err, result) => {
      if (err) {
        console.log("Could not get responses");
      } else {
        res.json({ responseArray: result });
      }
    }
  );
});

app.post("/post/unsave", async (req, res) => {
  let deleteID = req.body.unsaveID;
  console.log(deleteID); // delete later
  let deleteQuery = `DELETE FROM querytable WHERE (id = ${deleteID});`;
  dbconnection.query(deleteQuery, (err, result) => {
    if (err) {
      res.json({ message: "Response could not be unsaved" });
      console.log("Response could not be unsaved");
    } else {
      res.json({ message: "Response unsaved" });
      console.log("Response unsaved");
    }
  });
});

app.post("/post/displaySaved", (req, res) => {
  console.log(req.body.selectedID); // delete later
  dbconnection.query(
    `SELECT response FROM querytable WHERE id = ${req.body.selectedID}`,
    (err, result) => {
      if (err) {
        res.json({ message: "response could not be found" });
      } else {
        res.json({ message: result[0].response });
      }
    }
  );
});

app.get("/get/forum", (req, res) => {
  let forum = req.query.forumId;
  // console.log(forum);
  let query;

  if (forum === "all") {
    query =
      "SELECT * , (SELECT COUNT(*) FROM Threads WHERE Threads.ForumID = Forums.ForumID) AS questions, (SELECT COUNT(*) FROM Posts WHERE Posts.ThreadID IN (SELECT ThreadID FROM Threads WHERE Threads.ForumID = Forums.ForumID)) AS answers FROM Forums";
  } else {
    query = `SELECT * , (SELECT COUNT(*) FROM Threads WHERE Threads.ForumID = Forums.ForumID) AS questions, (SELECT COUNT(*) FROM Posts WHERE Posts.ThreadID IN (SELECT ThreadID FROM Threads WHERE Threads.ForumID = Forums.ForumID)) AS answers FROM Forums WHERE ForumID = ${forum}`;
  }

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
});

app.get("/get/threads", (req, res) => {
  let forumId = req.query.forumId;
  // console.log(threads);
  let query;

  query = `SELECT T.*, COUNT(P.ThreadID) AS PostCount
  FROM Threads T
  LEFT JOIN Posts P ON T.ThreadID = P.ThreadID
  WHERE T.ForumID = ${forumId}
  GROUP BY T.ThreadID`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
});

app.get("/get/thread", (req, res) => {
  let thread = req.query.threadId;
  let query = `
    SELECT 
      T.*, 
      U.Username,
      DATE_FORMAT(T.CreationDate, '%Y-%m-%d') AS Date
    FROM 
      Threads T
    JOIN 
      Users U ON T.UserID = U.UserID
    WHERE 
      T.ThreadID = ${thread}`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
});

app.get("/get/posts", (req, res) => {
  let thread = req.query.threadId;
  // console.log(threads);
  let query;

  query = `SELECT T.Title, F.Name, P.*, CASE
  WHEN TIMESTAMPDIFF(DAY, P.CreationDate, NOW()) < 1 THEN '0 days ago'
  WHEN TIMESTAMPDIFF(DAY, P.CreationDate, NOW()) = 1 THEN '1 day ago'
  ELSE CONCAT(TIMESTAMPDIFF(DAY, P.CreationDate, NOW()), ' days ago')
END AS TimeAgo, U.Username, U.Email FROM Posts P JOIN Threads T ON P.ThreadID = T.ThreadID JOIN Forums F ON T.ForumID = F.ForumID JOIN Users U ON P.UserID = U.UserID WHERE T.ThreadID = ${thread}`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
});

app.get("/put/create/forum", (req, res) => {
  let forumName = req.query.forumName;
  let forumDescription = req.query.content;
  let query;

  query = `INSERT INTO Forums (Name, Description) VALUES (?, ?)`;

  dbconnection.query(query, [forumName, forumDescription], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/put/create/thread", (req, res) => {
  let forumID = req.query.forumID;
  // let userID = req.query.userID;
  let title = req.query.title;
  let content = req.query.content;
  let tag = req.query.tags;
  console.log(tag);

  let query;

  query = `INSERT INTO Threads (ForumID, UserID, Title, CreationDate, Views, Content, UpVotes, DownVotes, Tag)
  VALUES (?, 1, ?, current_timestamp(), 0, ?, 0, 0, ?);`;

  dbconnection.query(query, [forumID, title, content, tag], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/put/create/post", (req, res) => {
  // let userID = req.query.userID;

  let threadID = req.query.threadID;
  let content = req.query.content;
  let tag = req.query.tags;

  let query;

  query = `INSERT INTO Posts (UserID, ThreadID, Content, CreationDate, UpVotes, DownVotes, Tag)VALUES ( 1, ?, ?, current_timestamp(), 0, 0, ?);`;

  dbconnection.query(query, [threadID, content, tag], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/update/post/vote", (req, res) => {
  let postID = req.query.postId;
  let vote = req.query.vote;

  let query;

  query = `UPDATE Posts SET ${vote} = ${vote} + 1 WHERE PostID = ${postID}`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/update/thread/vote", (req, res) => {
  let ThreadID = req.query.threadId;
  let vote = req.query.vote;

  let query;

  query = `UPDATE Threads SET ${vote} = ${vote} + 1 WHERE ThreadID = ${ThreadID}`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/check/post/vote", (req, res) => {
  let postID = req.query.postId;
  let userID = req.query.userId;
  let voteType = req.query.voteType;

  let checkQuery = `SELECT * FROM PostVoteTracking WHERE PostID = ${postID} AND UserID = ${userID}`;
  dbconnection.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing query:", checkErr);
      res.status(500).json({ message: "Internal server error" });
    } else {
      if (checkResult.length > 0) {
        // Update existing vote
        let updateQuery = `UPDATE PostVoteTracking SET VoteType = '${voteType}', VotedAt = CURRENT_TIMESTAMP WHERE PostID = ${postID} AND UserID = ${userID}`;
        dbconnection.query(updateQuery, (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error executing query:", updateErr);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.json({ message: "Post vote updated successfully" });
          }
        });
      } else {
        // Insert new vote
        let insertQuery = `INSERT INTO PostVoteTracking (UserID, PostID, VoteType) VALUES (${userID}, ${postID}, '${voteType}')`;
        dbconnection.query(insertQuery, (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error executing query:", insertErr);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.json({ message: "Post vote added successfully" });
          }
        });
      }
    }
  });
});

// Method to check and update values in the ThreadVoteTracking table
app.get("/check/thread/vote", (req, res) => {
  let threadID = req.query.threadId;
  let userID = req.query.userId; // Assuming you have the user ID
  let voteType = req.query.voteType; // Assuming you have the vote type (UpVote or DownVote)

  let checkQuery = `SELECT * FROM ThreadVoteTracking WHERE ThreadID = ${threadID} AND UserID = ${userID}`;
  dbconnection.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing query:", checkErr);
      res.status(500).json({ message: "Internal server error" });
    } else {
      if (checkResult.length > 0) {
        // Update existing vote
        let updateQuery = `UPDATE ThreadVoteTracking SET VoteType = '${voteType}', VotedAt = CURRENT_TIMESTAMP WHERE ThreadID = ${threadID} AND UserID = ${userID}`;
        dbconnection.query(updateQuery, (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error executing query:", updateErr);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.json({ message: "successful" });
          }
        });
      } else {
        // Insert new vote
        let insertQuery = `INSERT INTO ThreadVoteTracking (UserID, ThreadID, VoteType) VALUES (${userID}, ${threadID}, '${voteType}')`;
        dbconnection.query(insertQuery, (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error executing query:", insertErr);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.json({ message: "successful" });
          }
        });
      }
    }
  });
});

app.get("/update/views", (req, res) => {
  const threadID = req.query.threadId;
  const query = `UPDATE Threads SET Views = Views + 1 WHERE ThreadID = ${threadID}`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Views updated successfully" });
    }
  });
});

app.get("/get/popular-threads", (req, res) => {
  const query = `SELECT * FROM Threads ORDER BY UpVotes DESC LIMIT 5`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
});

//quiz fetching
// Define the API endpoint to retrieve quiz questions
app.get("/quiz/questions", (req, res) => {
  // Extract grade and lesson name from request query parameters
  const grade = req.query.grade;
  const lessonName = req.query.lessonName;
  console.log(grade, lessonName);

  // Query the database to retrieve lesson ID based on grade and lesson name
  const lessonQuery = `SELECT LessonID FROM Lessons WHERE grade = ? AND lessonName = ?`;
  dbconnection.query(lessonQuery, [grade, lessonName], (err, lessonResults) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: lessonResults });
      console.log(lessonResults);
    }

    // Extract lesson ID from the results
    const LessonID = lessonResults[0].LessonID;

    if (!LessonID) {
      res.json({ message: "Lesson not found" });
    }

    // Query the QuizQuestions table to retrieve questions for the lesson ID
    const questionsQuery = `SELECT * FROM QuizQuestions WHERE LessonID= ?`;
    dbconnection.query(questionsQuery, [LessonID], (err, questionsResults) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json({ message: questionsResults });
        console.log(questionsResults);
      }
    });
  });
});

app.listen(3001, () => {
  console.log("listenning on port 5000.");
});
