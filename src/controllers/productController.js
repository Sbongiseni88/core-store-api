//the controller decides what to do when a route is hit

//import our active database connection instance
import db from '../config/database.js';


/**
 * @desc Get all products from database
 * @route GET /api/v1/products
 */
export const getAllProducts = (req,res)=>{
   try {
    // prepare sql read statemetn and execute it to fetch All rows
    const statement = db.prepare('SELECT id, name, brand, created_at FROM products');
    const products = statement.all();

    return res.status(200).json({
        status: 'success',
        results: products.length,
        data: products
    })
   } catch (error) {
    return res.status(500).json({status: 'error', message:error.message});
   }
};

/**
 * @desc Get single product by its database ID
 * @route GET /api/v1/products/:id
 */
export const getProductById = (req,res)=>{
    try {
        const productId = req.params.id;

        //use parameterized placeholder to prevent sql injections
        const statement = db.prepare('SELECT id, name, brand, created_at FROM products WHERE id = ?');
        const product = statement.get(productId);

        //guard clause: validate existence
        if (!product){
            return res.status(404).json({
                status:'fail',
                message:`Product with ID ${productId} not found`
            });
        }
        return res.status(200).json({status:'success',data:product});
    } catch (error) {
        return res.statis(500).json({status:'error',message:error.message});
    }
};

/**
 * @desc Create a new persistent product record
 * @route POST /api/v1/products
 */
export const createProduct= (req,res)=>{
    try{
        
    //extract & deserialize request body with following fields
    const {name,brand}= req.body;

    //guard clause vaidation - check if fields were not parsed in
    if ( !name || !brand){
        return res.status(400).json({
            status:'fail',
            message:'missing required fields, please provide name, price and brand'
        });
    }
    //use named mplaceholders for clear value binding
    const statement = db.prepare(`
      INSERT INTO products (name, brand) 
      VALUES (@name, @brand)
    `);

    //execute the mutation, pass an object matching the named parameters
    const result = statement.run({name,brand});

    //new domain model object
    const newProduct = {
        id: result.lastInsertRowid,
        name: name,
        brand: brand
    };
    return res.status(201).json({status:'success',data:newProduct});
}catch (error){
    return res.status(500).json({status:'error', message:error.message})
}

};
