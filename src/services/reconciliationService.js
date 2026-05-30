function normalizeAsset(asset) {
    const map = {
        BITCOIN: "BTC",
        BTC: "BTC",
        ETHEREUM: "ETH",
        ETH: "ETH"
    };

    return map[(asset || "").toUpperCase()] ||
           (asset || "").toUpperCase();
}

function reconcile(userTxs, exchangeTxs) {

    const matched = [];
    const conflicting = [];
    const unmatchedUser = [];
    const unmatchedExchange = [];

    const used = new Set();

    for (const userTx of userTxs) {

        let found = false;

        for (let i = 0; i < exchangeTxs.length; i++) {

            if (used.has(i)) continue;

            const exTx = exchangeTxs[i];

            const sameAsset =
                normalizeAsset(userTx.asset) ===
                normalizeAsset(exTx.asset);

            const sameType =
                userTx.type === exTx.type ||
                (userTx.type === "TRANSFER_OUT" &&
                 exTx.type === "TRANSFER_IN");

            if (!sameAsset || !sameType) continue;

            const qtyDiff =
                Math.abs(
                    Number(userTx.quantity) -
                    Number(exTx.quantity)
                );

            if (qtyDiff <= 0.01) {

                matched.push({
                    user: userTx,
                    exchange: exTx
                });

            } else {

                conflicting.push({
                    user: userTx,
                    exchange: exTx,
                    reason: "Quantity mismatch"
                });
            }

            used.add(i);
            found = true;
            break;
        }

        if (!found) {
            unmatchedUser.push(userTx);
        }
    }

    exchangeTxs.forEach((tx, index) => {
        if (!used.has(index)) {
            unmatchedExchange.push(tx);
        }
    });

    return {
        matched,
        conflicting,
        unmatchedUser,
        unmatchedExchange
    };
}

module.exports = reconcile;