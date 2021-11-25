import Product from '../models/product';

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body; //the request is from the body, not from the query /:params
    const newProduct = new Product({ name, category, price, imgURL }); // must be a object
    const productSaved = await newProduct.save(); //at the same time you save the object, assign it to a const
    console.log(productSaved);
    res.status(201).json(productSaved);//now you can show the object saved to the client
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

export const getProductById = (req, res) => {

}

export const updateProduct = (req, res) => {

}

export const deleteProducts = (req, res) => {

}