const express = require("express");
const router = express.Router();

const { isAuth, isAdmin } = require("../middleware/authMiddleware");

const {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

// CREATE CUSTOMER
router.post("/", isAuth, isAdmin, createCustomer);

// GET ALL CUSTOMERS
router.get("/", isAuth, getAllCustomers);

// UPDATE CUSTOMER
router.put("/:id", isAuth, isAdmin, updateCustomer);

// DELETE CUSTOMER

router.delete("/:id", isAuth, isAdmin, deleteCustomer);
module.exports = router;
