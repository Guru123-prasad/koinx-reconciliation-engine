const parseCSV = require("../services/csvParser");
const reconcile = require("../services/reconciliationService");
const validateTransactions = require("../services/validationService");

exports.runReconciliation = async (req, res) => {

    try {

        const userTransactions =
            await parseCSV("./uploads/user_transactions.csv");

        const exchangeTransactions =
            await parseCSV("./uploads/exchange_transactions.csv");

        const validationIssues = [
            ...validateTransactions(userTransactions),
            ...validateTransactions(exchangeTransactions)
        ];

        const report = reconcile(
            userTransactions,
            exchangeTransactions
        );

        res.json({
            validationIssues,
            ...report
        });

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
};