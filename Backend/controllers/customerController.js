const Customer = require("../models/Customer");


// =========================
// CREATE CUSTOMER
// =========================
const createCustomer = async (req, res) => {
    try {
        // Check if email already exists
        const existingCustomer = await Customer.findOne({ email: req.body.email });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: savedCustomer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================
// GET ALL CUSTOMERS
// =========================
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("purchaseHistory");

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================
// UPDATE CUSTOMER
// =========================
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        // If email is being changed → check duplicate
        if (req.body.email && req.body.email !== customer.email) {
            const existingEmail = await Customer.findOne({ email: req.body.email });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================
// DELETE CUSTOMER
// =========================
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
};
