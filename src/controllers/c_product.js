const Product = require('../models/m_product');

// Get All Products, Sorted by Price
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ price: 1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Add a New Product
exports.createProduct = async (req, res) => {
    const { name, price, stockQuantity } = req.body;

    if (!name || price == null || stockQuantity == null) {
        return res.status(400).json({ message: 'Name, price, and stock quantity are required' });
    }

    const newProduct = new Product({ name, price, stockQuantity });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error saving product', error: err });
    }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err });
    }
};

exports.getProductsOnPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        let query = {};

        if (req.query.name) {
        }

        // ค้นหาตามราคาที่ต่ำกว่าหรือเท่ากับราคาที่กำหนด
        if (req.query.price) {
            query.price = { $lte: parseFloat(req.query.price) }; // ค้นหาสินค้าราคาต่ำกว่าหรือเท่ากับที่กำหนด
        }

        // ค้นหาตามจำนวนสินค้าที่มีในสต็อก
        if (req.query.stockQuantity) {
            query.stockQuantity = { $gte: parseInt(req.query.stockQuantity) }; // ค้นหาสินค้าที่มีจำนวนในสต็อกมากกว่าหรือเท่ากับที่กำหนด
        }

        // ค้นหาสินค้าตามเงื่อนไขที่กำหนดและการจัดเรียงตามราคา
        const products = await Product.find(query)
            .sort({ price: 1 })
            .skip(skip)
            .limit(limit);

        // คำนวณจำนวนสินค้าทั้งหมดที่ตรงกับเงื่อนไขการค้นหา
        const totalProducts = await Product.countDocuments(query);

        // คำนวณจำนวนหน้าทั้งหมด
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            products,
            totalProducts,
            totalPages,
            currentPage: page,
            limit,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};