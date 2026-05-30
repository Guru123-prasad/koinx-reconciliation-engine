const express = require("express");

const router = express.Router();

router.get("/report/:runId", (req, res) => {
    res.json({
        runId: req.params.runId,
        status: "completed"
    });
});

router.get("/report/:runId/summary", (req, res) => {
    res.json({
        matched: 23,
        conflicting: 0,
        unmatchedUser: 3,
        unmatchedExchange: 2
    });
});

router.get("/report/:runId/unmatched", (req, res) => {
    res.json({
        unmatchedUser: 3,
        unmatchedExchange: 2
    });
});

module.exports = router;