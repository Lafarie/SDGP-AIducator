const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
});

dbconnection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
}   );

module.exports = dbconnection;

// Path: server/server.js
// Compare this snippet from client/src/Post.jsx:
