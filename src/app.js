const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const reconcileRoutes = require("./routes/reconcileRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(express.json());

app.use("/api", reconcileRoutes);
app.use("/api", reportRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

app.get("/", (req, res) => {
    res.send("KoinX Reconciliation Engine Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});