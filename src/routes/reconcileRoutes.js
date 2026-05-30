const express = require("express");

const router = express.Router();

const {
    runReconciliation
} = require("../controllers/reconcileController");

router.get(
    "/reconcile",
    runReconciliation
);

module.exports = router;