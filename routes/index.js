var express = require("express");
var router = express.Router();
const { con } = require("./../con");

con.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
