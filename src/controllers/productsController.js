import Product from '../models/product';

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body; //the request is from the body, not from the query /:params
    const newProduct = new Product({ name, category, price, imgURL }); // must be a object ({})
    const productSaved = await newProduct.save(); //at the same time you save the object, assign it to a const
    console.log(productSaved);
    res.status(201).json(productSaved);//now you can show the object saved to the client
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const content = req.body;
    const product = await Product.findByIdAndUpdate(id, content, { new: true });
    res.json(product)
}

export const deleteProducts = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.json(product);
}