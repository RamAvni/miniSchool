const express = require("express");
const router = express.Router();
const { con } = require("../con");

router.patch("/", (req, res) => {
    con.query(
        `UPDATE teacher SET name = '${req.body.name}', school_code = ${req.body["school_code"]}, password = ${req.body.password}, email = '${req.body.email}' WHERE id = ${req.body.id}`,
        (err) => {
            if (err) throw err;
        }
    );

    res.send("success");
});

module.exports = router;
