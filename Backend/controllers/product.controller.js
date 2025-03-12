import Product from "../models/product.model.js"
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data:products});
    } catch(error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.image || !product.price) {
        return res.status(400).json({success: false, message: 'Please fill all required fields'});

    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(200).json({success: true, message: 'Product created', data: newProduct});

    } catch(error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: 'Product not found, invalid ID'});
    }

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id,product, {new:true});
        res.status(200).json({success: true, data:updatedProduct});
    }catch(error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getProductbyID = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: 'Product not found, invalid ID'});
    }

    try {
        const productbyID = await Product.findById(id);
        res.status(200).json({success: true, data:productbyID});
    } catch {
        res.status(500).json({success: false, message: "Server Error"});
    }
}