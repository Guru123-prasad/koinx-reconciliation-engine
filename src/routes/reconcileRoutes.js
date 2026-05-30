const express = require("express");

const router = express.Router();

router.get("/reconcile", (req, res) => {
    res.json({
        message: "Reconciliation API Working"
    });
});

module.exports = router;