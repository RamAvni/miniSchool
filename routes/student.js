var express = require("express");
var router = express.Router();
const { con } = require("../con");

const dataD = {
    name: "tair",
};
const dataA = {
    name: "noa",
    password: "4321",
    classroom_id: "2",
};

const addStudent = (dataA) => {
    var sql = `INSERT INTO student (name, password, classroom_id, ) VALUES(${data.name}, ${data.password} ,${data.classroom_id})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
};

const deleteStudent = (dataD) => {
    var sql = `DELETE FROM student WHERE name =${data.name}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
};

deleteStudent(dataD);
addStudent(dataA);

module.exports = router;
