const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    transaction_id: String,
    timestamp: String,
    type: String,
    asset: String,
    quantity: Number,
    price_usd: Number,
    fee: Number,
    note: String,
    source: String
});

module.exports = mongoose.model(
    "Transaction",
    TransactionSchema
);