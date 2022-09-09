const {
  getAllTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
  createTransaction,
} = require("../controllers/transactionController");

const authenticate = require('../authenticate');

const router = require("express").Router();

router.get("/", authenticate, getAllTransaction);

router.post("/", authenticate, createTransaction);

router.get("/:id", authenticate, getTransactionById);

router.put("/:id", authenticate, updateTransaction);

router.delete("/:id", authenticate, deleteTransaction);

module.exports = router;
