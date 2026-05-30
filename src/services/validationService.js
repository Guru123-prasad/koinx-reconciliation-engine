function validateTransactions(transactions) {

    const issues = [];
    const ids = new Set();

    transactions.forEach(tx => {

        if (ids.has(tx.transaction_id)) {
            issues.push({
                transaction: tx,
                reason: "Duplicate transaction id"
            });
        }

        ids.add(tx.transaction_id);

        if (!tx.timestamp ||
            isNaN(new Date(tx.timestamp).getTime())) {

            issues.push({
                transaction: tx,
                reason: "Invalid timestamp"
            });
        }

        if (Number(tx.quantity) < 0) {

            issues.push({
                transaction: tx,
                reason: "Negative quantity"
            });
        }
    });

    return issues;
}

module.exports = validateTransactions;