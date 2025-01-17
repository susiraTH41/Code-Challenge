const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Use uuid library to generate UUIDs

const ProductSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4, // Automatically generates a UUID
            unique: true,    // Ensures the product id is unique
        },
        name: {
            type: String,
            required: true,  // Ensures the product name is required
            trim: true,      // Removes any leading/trailing whitespace
        },
        price: {
            type: Number,
            required: true,  // Ensures the price is required
            min: [0, 'Price must be a positive value'], // Ensures price is not negative
        },
        stockQuantity: {
            type: Number,
            required: true,  // Ensures stock quantity is required
            min: [0, 'Stock quantity cannot be less than 0'], // Ensures stock quantity is not negative
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Product', ProductSchema);