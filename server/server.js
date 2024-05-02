const mysql = require('mysql2');
const OpenAI = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const moderationUrl = "https://api.openai.com/v1/moderations"; // Open AI moderation URL

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const dbconnection = mysql.createPool({
  host: "34.131.236.33",
  user: "aiducator",
  password: "]?k(*D|^.]0FJ][=",
  port: 3306,
  database: "Aiducator",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();

app.use(bodyParser.json());


function pingdb() {
  dbconnection.getConnection((err, connection) => {
    if (err) throw err; // not connected!

    var sql_keep = `SELECT 1 + 1 AS solution`;
    connection.query(sql_keep, function (err, result) {
      connection.release(); // release the connection back to the pool
      if (err) throw err;
    });
  });
}

setInterval(pingdb, 40000);

dbconnection.getConnection((err) => {
  if (err) {
    console.error('Error connecting: ' + err);
  } else {
    console.log("connected");
  }
});

dbconnection.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }

  // Use the connection
  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (error) {
      console.error('Error executing query: ' + error.stack);
      return;
    }

    // If there is no error, your query was successful
    console.log('The solution is: ', results[0].solution);
  });
});

const usersql = `CREATE TABLE Users (
  UserID VARCHAR(50) PRIMARY KEY,
  Name VARCHAR(100));`;

const forumsql = `CREATE TABLE Forums (
  ForumID INT AUTO_INCREMENT PRIMARY KEY,
  UserID VARCHAR(50),
  Name VARCHAR(100),
  Description TEXT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);`;

const threadsql = `CREATE TABLE Threads (
  ThreadID INT AUTO_INCREMENT PRIMARY KEY,
  ForumID INT,
  UserID VARCHAR(50),
  Title VARCHAR(255),
  CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Views INT DEFAULT 0,
  Content VARCHAR(255),
  Tag VARCHAR(255),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ForumID) REFERENCES Forums(ForumID)
);`;

const postsql = `CREATE TABLE Posts (
  PostID INT AUTO_INCREMENT PRIMARY KEY,
  UserID VARCHAR(50),
  ThreadID INT,
  Content TEXT,
  CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Tag VARCHAR(255),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ThreadID) REFERENCES Threads(ThreadID)
);`;

const postVotesql = `CREATE TABLE PostVoteTracking (
  VoteID INT AUTO_INCREMENT PRIMARY KEY,
  UserID VARCHAR(50),
  PostID INT,
  VoteType ENUM('UpVotes', 'DownVotes', 'Removed') DEFAULT NULL,
  VotedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (PostID) REFERENCES Posts(PostID)
);`;

const threadVotesql = `CREATE TABLE ThreadVoteTracking (
  VoteID INT AUTO_INCREMENT PRIMARY KEY,
  UserID VARCHAR(50),
  ThreadID INT,
  VoteType ENUM('UpVotes', 'DownVotes') DEFAULT NULL,
  VotedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ThreadID) REFERENCES Threads(ThreadID)
);`;

let tablesql =
  "CREATE TABLE querytable" +
  "(id INTEGER NOT NULL AUTO_INCREMENT," +
  "prompt VARCHAR(100) NOT NULL," +
  "response VARCHAR(5000) NOT NULL," +
  "promptrating VARCHAR(10)," +
  "CONSTRAINT q_id_pk PRIMARY KEY (id));";

let modelTable = `CREATE TABLE modelTable 
    (id INTEGER NOT NULL AUTO_INCREMENT,
    modelSrc VARCHAR(100) NOT NULL,
    modelName VARCHAR(200),
    tagStr VARCHAR(200) NOT NULL,
    CONSTRAINT model_id_pk PRIMARY KEY (id));`;

// adding models
let addmodels = `
INSERT INTO modelTable (modelSrc, modelName, tagStr)
VALUES 
    ('Cylinder.glb', 'Cylinder', 'geometry,math'),
    ('Hexagon.glb', 'Hexagon', 'geometry,math'),
    ('square.glb', 'Square', 'geometry,math'),
    ('Triangle.glb', 'Rectangle', 'geometry,math'),
    ('Circle.glb', 'Circle', 'geometry,math'),
    ('beaker.glb', 'Beaker', 'science,chemical'),
    ('conical.glb', 'Conical FLask', 'science,chemical'),
    ('earth.glb', 'Earth', 'geography,geology,astronomy'),
    ('FlatFlask.glb', 'Flat FLask', 'science,chemical'),
    ('GCylinder.glb', 'Graduated Cylinder', 'science,chemical'),
    ('testTube.glb', 'Test Tube', 'science,chemical'),
    ('mountain.glb', 'Mountain', 'geography,geology')
    ;`;


dbconnection.getConnection((err, connection) => {
  if (err) throw err; // not connected!

  connection.query("USE Aiducator", function(err) {
    if (err) throw err;
    console.log('Database changed');
    connection.release(); // release the connection back to the pool
  });
});

const createTable = async (sql, tableName) => {
  return new Promise((resolve, reject) => {
    dbconnection.query(sql, (err) => {
      if (err) {
        if (err.errno === 1050) {
          // console.log(`${tableName} table already exists`);
          resolve();
        } else {
          console.error(`Error creating ${tableName} table:`, err);
          reject(err);
        }
      } else {
        console.log(`${tableName} table created successfully`);
        resolve();
      }
    });
  });
};

// const createDatabase = () => {
//   return new Promise((resolve, reject) => {
//     dbconnection.query("CREATE DATABASE IF NOT EXISTS AIducator", (err) => {
//       if (err) {
//         console.error("Error creating database:", err);
//         reject(err);
//       } else {
//         console.log("Database created or already exists");
//         resolve();
//       }
//     });
//   });
// };

// createDatabase()

dbconnection.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);

  createTable(usersql, "Users")
    .then(() => createTable(forumsql, "Forums"))
    .then(() => createTable(threadsql, "Threads"))
    .then(() => createTable(postsql, "Posts"))
    .then(() => createTable(postVotesql, "PostVoteTracking"))
    .then(() => createTable(threadVotesql, "Thread Vote"))
    .then(() => createTable(tablesql, "queryTable"))
    .catch((err) => {
      console.error("An error occurred:", err);
    }).finally(() => {
      connection.release();
    });
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

function MatchingTags(array1, array2) {
  let count = 0;
  array1.forEach((element) => {
    if (array2.indexOf(element) !== -1) {
      count++;
    }
  });

  if (count >= 1) {
    return true;
  } else {
    return false;
  }
}

//fucntion to get what models match
function getMatchingModels(promptTagArr) {
  return new Promise((resolve, reject) => {
    let getModels = `SELECT modelSrc, tagStr, modelName FROM modelTable;`;
    let modelArray = [];

    dbconnection.query(getModels, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        results.forEach((result) => {
          let sqltags = result.tagStr.split(",");
          if (MatchingTags(promptTagArr, sqltags)) {
            modelArray.push(result.modelSrc + "," + result.modelName);
          }
        });
        resolve(modelArray);
      }
    });
  });
}

dbconnection.query(modelTable, (err, results) => {
  if (err) {
    if (err.errno === 1050) {
      // console.log("modelTable table already exists");
    }
  } else {
    console.log("modelTable table created successfully");
  }
});

let gettingCount = `SELECT COUNT(*) AS count FROM modelTable`;

dbconnection.query(gettingCount, (err, results) => {
  if (err) {
    console.error(err);
  } else {
    const count = results[0].count;
    console.log(count);

    if (count === 0) {
      dbconnection.query(addmodels, (err, result) => {
        if (err) {
          console.log("Error is adding values");
        } else {
          console.log("models added sucessfully");
        }
      });
    } else {
      console.log("Models already added");
    }
  }
});

async function getKeywords(input) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: MODELINSTRUCTIONS },
      { role: "assistant", content: input },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0];
}

function getCategories(objectArr) {
  let keyArr = Object.keys(objectArr);
  let returnArr = [];
  keyArr.forEach((elements) => {
    if (objectArr[elements]) {
      returnArr.push(elements);
    }
  });
}

app.get("/", (req, res) => {
  res.send("Hello Worlds");
});

app.post("/post/prompt", async (req, res) => {
  console.log(req.body.prompt); // remove later
  if (req.body.prompt === "") {
    res.json({
      generated_result: "I'm sorry but I have not recieved a proper question.",
    });
  } else {
    fetch(moderationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ input: req.body.prompt }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (!data.results[0].flagged) {
          let returnMsg = main(req.body.prompt);
          let tags = getKeywords(req.body.prompt);
          let result = (await returnMsg).message;
          let tagresults = (await tags).message;
          let searchArr = [];
          tagresults.content.split(",").forEach((element) => {
            let trimmed = element.trim().toLowerCase();
            searchArr.push(trimmed);
          });
          console.log(searchArr);
          let modelArray = await getMatchingModels(searchArr)
            .then((result) => {
              return result;
            })
            .catch((err) => {
              console.error(err);
            });
          console.log(modelArray);
          res.json({
            flagged: false,
            generated_result: result.content,
            tags: tagresults.content,
            models: modelArray,
          });
        } else {
          let arr = getCategories(data.results[0].categories);
          res.json({ flagged: true, generated_result: arr });
        }
      });
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
            } else {
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


app.get("/get/users", (req, res) => {
  dbconnection.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
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

  query = `
    SELECT 
      T.*, 
      COUNT(P.ThreadID) AS PostCount,
      IFNULL(SUM(CASE WHEN TVT.VoteType = 'UpVotes' THEN 1 ELSE 0 END), 0) AS UpVotes,
      IFNULL(SUM(CASE WHEN TVT.VoteType = 'DownVotes' THEN 1 ELSE 0 END), 0) AS DownVotes
    FROM 
      Threads T
    LEFT JOIN 
      Posts P ON T.ThreadID = P.ThreadID
    LEFT JOIN 
      ThreadVoteTracking TVT ON T.ThreadID = TVT.ThreadID
    WHERE 
      T.ForumID = ${forumId}
    GROUP BY 
      T.ThreadID`;
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
  // console.log(thread);
  let query = `
  SELECT 
  T.*, 
  U.Name AS UserName,
  F.Name AS ForumName,
  DATE_FORMAT(T.CreationDate, '%Y-%m-%d') AS Date,
  COUNT(DISTINCT P.PostID) AS PostCount,
  IFNULL(SUM(CASE WHEN TVT.VoteType = 'UpVotes' THEN 1 ELSE 0 END), 0) AS UpVotes,
  IFNULL(SUM(CASE WHEN TVT.VoteType = 'DownVotes' THEN 1 ELSE 0 END), 0) AS DownVotes
FROM 
  Threads T
JOIN 
  Users U ON T.UserID = U.UserID
JOIN 
  Forums F ON T.ForumID = F.ForumID
LEFT JOIN 
  Posts P ON T.ThreadID = P.ThreadID
LEFT JOIN 
  ThreadVoteTracking TVT ON T.ThreadID = TVT.ThreadID
WHERE 
  T.ThreadID = ${thread}
GROUP BY 
  T.ThreadID;
`;

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
  // console.log(thread);

  const query = `SELECT 
  T.Title, 
  P.*, 
  CASE
    WHEN TIMESTAMPDIFF(DAY, P.CreationDate, NOW()) < 1 THEN '0 days ago'
    WHEN TIMESTAMPDIFF(DAY, P.CreationDate, NOW()) = 1 THEN '1 day ago'
    ELSE CONCAT(TIMESTAMPDIFF(DAY, P.CreationDate, NOW()), ' days ago')
  END AS TimeAgo, 
  U.Name,
  IFNULL(SUM(CASE WHEN PVT.VoteType = 'UpVotes' THEN 1 ELSE 0 END), 0) AS UpVotes,
  IFNULL(SUM(CASE WHEN PVT.VoteType = 'DownVotes' THEN 1 ELSE 0 END), 0) AS DownVotes
FROM 
  Posts P 
JOIN 
  Threads T ON P.ThreadID = T.ThreadID 
JOIN 
  Users U ON P.UserID = U.UserID 
LEFT JOIN 
  PostVoteTracking PVT ON P.PostID = PVT.PostID
WHERE 
  T.ThreadID = ?
GROUP BY 
  P.PostID`;

  dbconnection.query(query, [thread], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: result });
    }
  });
});

app.get("/put/create/forum", async (req, res) => {
  try {
    let forumName = req.query.forumName;
    let forumDescription = req.query.content;
    let query = `INSERT INTO Forums (Name, Description) VALUES (?, ?)`;

    // Assuming dbconnection.query supports promises
    const result = await dbconnection.query(query, [
      forumName,
      forumDescription,
    ]);

    res.json({ message: "Forum created successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/put/create/thread", (req, res) => {
  let forumID = req.query.forumID;
  let userID = req.query.userID;
  let title = req.query.title;
  let content = req.query.content;
  let tag = req.query.tags;
  console.log(userID);

  let query;

  query = `INSERT INTO Threads (ForumID, UserID, Title, CreationDate, Views, Content, Tag)
  VALUES (?, ?, ?, current_timestamp(), 0, ?, ?);`;

  dbconnection.query(
    query,
    [forumID, userID, title, content, tag],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
});

app.get("/put/create/post", (req, res) => {
  let userID = req.query.userID;
  let threadID = req.query.threadID;
  let content = req.query.content;
  let tag = req.query.tags;

  // console.log(threadID);
  let query;

  query = `INSERT INTO Posts (UserID, ThreadID, Content, CreationDate, Tag)VALUES ( ?, ?, ?, current_timestamp(), ?);`;

  dbconnection.query(query, [userID, threadID, content, tag], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.post("/post/create/user", (req, res) => {
  let uid = req.body.uid;
  let username = req.body.username;
  // console.log(uid);
  // console.log(username);

  let query = `SELECT * FROM Users WHERE UserID = ?`;

  dbconnection.query(query, [uid], (err, result) => {
    if (result.length === 0) {
      let insertQuery = `INSERT INTO Users (UserID, Name) VALUES (?, ?)`;
      dbconnection.query(insertQuery, [uid, username], (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ message: "Internal server error" });
        } else {
          res.json({ message: "User created successfully" });
        }
      });
    } else {
      res.json({ message: "User already exists" });
    }
  });
});

app.get("/check/post/vote", (req, res) => {
  let postID = req.query.postId;
  let userID = req.query.userId;
  let voteType = req.query.voteType;

  let checkQuery = `SELECT * FROM PostVoteTracking WHERE PostID = ${postID} AND UserID = '${userID}'`;
  dbconnection.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing query:", checkErr);
      res.status(500).json({ message: "Internal server error" });
    } else {
      if (checkResult.length > 0) {
        // Update existing vote
        let updateQuery = `UPDATE PostVoteTracking SET VoteType = '${voteType}', VotedAt = CURRENT_TIMESTAMP WHERE PostID = ${postID} AND UserID = '${userID}'`;
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
        let insertQuery = `INSERT INTO PostVoteTracking (UserID, PostID, VoteType) VALUES ('${userID}', ${postID}, '${voteType}')`;
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

// Method to check and update values in the ThreadVoteTracking table
app.get("/check/thread/vote", (req, res) => {
  let threadID = req.query.threadId;
  let userID = req.query.userId;
  let voteType = req.query.voteType;

  let checkQuery = `SELECT * FROM ThreadVoteTracking WHERE ThreadID = ${threadID} AND UserID = '${userID}'`;
  dbconnection.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing query:", checkErr);
      res.status(500).json({ message: "Internal server error" });
    } else {
      if (checkResult.length > 0) {
        // Update existing vote
        let updateQuery = `UPDATE ThreadVoteTracking SET VoteType = '${voteType}', VotedAt = CURRENT_TIMESTAMP WHERE ThreadID = ${threadID} AND UserID = '${userID}'`;
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
        let insertQuery = `INSERT INTO ThreadVoteTracking (UserID, ThreadID, VoteType) VALUES ('${userID}', ${threadID}, '${voteType}')`;
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

app.post("/update/views", (req, res) => {
  const threadID = req.body.threadId;

  const query = `UPDATE Threads SET Views = Views + 1 WHERE ThreadID = ?`;

  dbconnection.query(query, [threadID], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Views updated successfully" });
    }
  });
});

app.get("/get/popular-threads", (req, res) => {
  const query = `
    SELECT 
      T.*, 
      COUNT(TVT.ThreadID) AS UpVotes 
    FROM 
      Threads T 
    LEFT JOIN 
      ThreadVoteTracking TVT ON T.ThreadID = TVT.ThreadID 
    WHERE 
      TVT.VoteType = 'UpVotes' 
    GROUP BY 
      T.ThreadID 
    ORDER BY 
      UpVotes DESC 
    LIMIT 
      8`;

  dbconnection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      if (result.length != 0) {
        res.json({ message: result });
      } else {
        const query = `SELECT * FROM Threads ORDER BY Views DESC LIMIT 8`;
        dbconnection.query(query, (err, result) => {
          if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.json({ message: result });
          }
        });
      }
    }
  });
});

app.post("/get/test", (req, res) => {
  const gradeid = req.body.QuestionDetails.gradeid;
  const lessonName = req.body.QuestionDetails.lessonName;
  console.log(req.body.QuestionDetails.gradeid);
  console.log(lessonName);
  const query = `SELECT * FROM QuizQuestions WHERE LessonID IN (SELECT LessonID FROM Lessons WHERE grade = ${parseInt(
    gradeid
  )} AND lessonName = '${lessonName}')`;
  dbconnection.query(query, (err, questionResults) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      let optionArray = [];
      Promise.all(
        questionResults.map((question) => {
          return new Promise((resolve, reject) => {
            const optionsQuery =
              "SELECT OptionText FROM QuestionOptions WHERE QuestionID = ?";
            dbconnection.query(
              optionsQuery,
              [question.QuestionID],
              (err, optionsResults) => {
                if (err) {
                  console.error("Error retrieving question options:", err);
                  reject("Internal server error");
                } else {
                  const options = optionsResults.map(
                    (option) => option.OptionText
                  );
                  console.log(options);
                  optionArray.push(options);
                  resolve();
                }
              }
            );
          });
        })
      )
        .then(() => {
          res.json({ questions: questionResults, options: optionArray });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        });
    }
  });
});

app.post("/get/quiz", (req, res) => {
  const gradeid = req.body.QuestionDetails.gradeid;
  const lessonName = req.body.QuestionDetails.lessonName;
  const query = `SELECT
          QQ.QuestionID,
          QQ.QuestionText,
          QQ.LessonID,
          QQ.CorrectAnswerIndex,
          GROUP_CONCAT(QO.OptionText) AS OptionTexts
      FROM
          QuizQuestions QQ
      JOIN
          QuestionOptions QO ON QQ.QuestionID = QO.QuestionID
      WHERE
          QQ.LessonID IN (
              SELECT LessonID
              FROM Lessons
              WHERE grade = ${parseInt(gradeid)}
              AND lessonName = '${lessonName}'
          )
      GROUP BY
          QQ.QuestionID,
          QQ.QuestionText,
          QQ.LessonID,
          QQ.CorrectAnswerIndex;`;
  dbconnection.query(query, (err, questionResults) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: questionResults });
    }
  });
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
}
);