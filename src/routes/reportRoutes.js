const express = require("express");

const router = express.Router();

router.get("/report/:runId", (req,res)=>{
    res.json({
        runId:req.params.runId,
        status:"completed"
    });
});

router.get("/report/:runId/summary",(req,res)=>{
    res.json({
        matched:0,
        conflicting:0,
        unmatchedUser:0,
        unmatchedExchange:0
    });
});

router.get("/report/:runId/unmatched",(req,res)=>{
    res.json({
        message:"Unmatched transactions"
    });
});

module.exports = router;