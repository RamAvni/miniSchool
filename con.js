const mysql = require("mysql");
let con;
try {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "z10mz10m",
    });
} catch (e) {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "z10mz10m",
        database: "miniSchool",
    });
}

module.exports = { con };
