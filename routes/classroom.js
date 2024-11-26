var express = require("express");
var router = express.Router();
const { con } = require("../con");

const data = {
    grade: "a",
    index: "1",
    teacher_id: "1",
    school_id: "1",
};

const addClassroom = (data) => {
    var sql = `INSERT INTO student (grade, index, teacher_id, school_id) VALUES(${data.grade}, ${data.index} ,${data.teacher_id} ,${data.school_id})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
};

addClassroom(data);

module.exports = router;
