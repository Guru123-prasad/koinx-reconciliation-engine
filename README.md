# KoinX Reconciliation Engine

## Overview

A backend transaction reconciliation engine built using Node.js, Express.js, and MongoDB.

The system compares user transaction records with exchange transaction records and identifies:

* Matched Transactions
* Conflicting Transactions
* Unmatched User Transactions
* Unmatched Exchange Transactions
* Data Validation Issues

## Features

### Transaction Reconciliation

* Matches transactions based on asset, type, and quantity.
* Supports asset normalization.
* Supports transfer mapping between user and exchange records.

### Asset Normalization

Supported aliases:

* bitcoin → BTC
* BTC → BTC
* ethereum → ETH
* ETH → ETH

### Transfer Mapping

Maps:

* TRANSFER_OUT ↔ TRANSFER_IN

### Validation Rules

Detects:

* Duplicate Transaction IDs
* Invalid Timestamps
* Missing Timestamps
* Negative Quantities

### Reports

Provides:

* Reconciliation Report
* Summary Report
* Unmatched Transactions Report

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* CSV Parser

## Project Structure

```text
src
├── app.js
├── controllers
│   └── reconcileController.js
├── models
│   └── Transaction.js
├── routes
│   ├── reconcileRoutes.js
│   └── reportRoutes.js
├── services
│   ├── csvParser.js
│   ├── reconciliationService.js
│   └── validationService.js

uploads
├── user_transactions.csv
└── exchange_transactions.csv
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Guru123-prasad/koinx-reconciliation-engine.git
cd koinx-reconciliation-engine
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/koinx
```

### Start Server

```bash
node src/app.js
```

Expected output:

```text
Server running on port 3000
MongoDB Connected
```

## API Endpoints

### Health Check

```http
GET /
```

### Reconciliation Report

```http
GET /api/reconcile
```

### Summary Report

```http
GET /api/report/1/summary
```

### Unmatched Transactions

```http
GET /api/report/1/unmatched
```

## Sample Results

### Validation Issues

* Duplicate Transaction ID
* Invalid Timestamp
* Missing Timestamp
* Negative Quantity

### Summary

* Matched Transactions: 21
* Conflicting Transactions: 2
* Unmatched User Transactions: 3
* Unmatched Exchange Transactions: 2
* Validation Issues: 4

## Future Improvements

1. Timestamp-based transaction matching with configurable tolerance (e.g., 5 minutes).
2. Reconciliation run storage in MongoDB with unique Run IDs.
3. CSV export reports for:

   * Matched Transactions
   * Conflicting Transactions
   * Unmatched Transactions
4. Dynamic report retrieval using Run IDs.
5. Additional validation rules and performance optimizations.

## Author

**Guruprasad H S**

Backend Intern Assignment Submission for KoinX.
