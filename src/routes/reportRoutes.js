const express = require("express");
const parseCSV = require("../services/csvParser");
const reconcile = require("../services/reconciliationService");

const router = express.Router();

router.get("/report/:runId", (req, res) => {
    res.json({
        runId: req.params.runId,
        status: "completed"
    });
});

router.get("/report/:runId/summary", async (req, res) => {

    const userTxs =
        await parseCSV("./uploads/user_transactions.csv");

    const exchangeTxs =
        await parseCSV("./uploads/exchange_transactions.csv");

    const report =
        reconcile(userTxs, exchangeTxs);

    res.json({
        matched: report.matched.length,
        conflicting: report.conflicting.length,
        unmatchedUser: report.unmatchedUser.length,
        unmatchedExchange: report.unmatchedExchange.length
    });
});

router.get("/report/:runId/unmatched", async (req, res) => {

    const userTxs =
        await parseCSV("./uploads/user_transactions.csv");

    const exchangeTxs =
        await parseCSV("./uploads/exchange_transactions.csv");

    const report =
        reconcile(userTxs, exchangeTxs);

    res.json({
        unmatchedUser: report.unmatchedUser,
        unmatchedExchange: report.unmatchedExchange
    });
});

module.exports = router;