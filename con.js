const mysql = require("mysql");

try {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "z10mz10m",
    });
} catch (e) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "z10mz10m",
        database: "miniSchool",
    });
}

module.exports = { con };
