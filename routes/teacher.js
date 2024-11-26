const express = require("express");
const router = express.Router();

router.patch("/", (req, res) => {
    res.send("Hi");
});

module.exports = router;
