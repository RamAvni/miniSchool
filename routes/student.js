var express = require("express");
var router = express.Router();
const { con } = require("con");

const data = {
    name: "tair",
};

const deleteStudent = (data) => {
    con.connect(function (err) {
        if (err) throw err;
        var sql = `DELETE FROM student WHERE name =${data.name}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    });
};

deleteStudent(data);

module.exports = router;
