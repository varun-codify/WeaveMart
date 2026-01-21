const { body, validationResult } = require('express-validator');

// Validation middleware for order creation
const validateOrder = [
    body('customerInfo.firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ max: 50 }).withMessage('First name is too long'),

    body('customerInfo.lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ max: 50 }).withMessage('Last name is too long'),

    body('customerInfo.email')
        .trim()
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),

    body('customerInfo.phone')
        .trim()
        .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),

    body('customerInfo.address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ max: 200 }).withMessage('Address is too long'),

    body('customerInfo.city')
        .trim()
        .notEmpty().withMessage('City is required')
        .isLength({ max: 50 }).withMessage('City name is too long'),

    body('customerInfo.state')
        .trim()
        .notEmpty().withMessage('State is required')
        .isLength({ max: 50 }).withMessage('State name is too long'),

    body('customerInfo.zipCode')
        .trim()
        .matches(/^[0-9]{6}$/).withMessage('ZIP code must be 6 digits'),

    body('items')
        .isArray({ min: 1 }).withMessage('Cart must contain at least one item'),

    body('items.*.quantity')
        .isInt({ min: 1, max: 99 }).withMessage('Invalid quantity'),

    body('total')
        .isFloat({ min: 0 }).withMessage('Invalid total amount'),

    body('paymentMethod')
        .isIn(['card', 'upi', 'cod']).withMessage('Invalid payment method'),

    body('paymentStatus')
        .isIn(['pending', 'completed', 'failed']).withMessage('Invalid payment status'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    validateOrder
};
