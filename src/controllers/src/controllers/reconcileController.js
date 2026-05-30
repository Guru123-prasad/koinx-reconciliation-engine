const parseCSV = require("../services/csvParser");
const reconcile = require("../services/reconciliationService");

exports.runReconciliation = async (req, res) => {

    try {

        const userTransactions =
            await parseCSV("./uploads/user_transactions.csv");

        const exchangeTransactions =
            await parseCSV("./uploads/exchange_transactions.csv");

        const report = reconcile(
            userTransactions,
            exchangeTransactions
        );

        res.json(report);

    } catch(error) {

        res.status(500).json({
            error:error.message
        });
    }
};