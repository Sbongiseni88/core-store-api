//the controller decides what to do when a route is hit

//mock data array to act as temp database
const mockProducts= [
    {id:1, name:'All-Purpose Cement', price:120.00, brand: 'AfriSam'},
    {id:2, name:'Build-Crate Cement', price:100.00, brand: 'PPC'}
];

/**
 * @desc Get all products
 * @route GET /api/v1/products
 */
export const getAllProducts = (req,res)=>{
    return res.status(200).json({
        status: 'success',
        results: mockProducts.length,
        data: mockProducts
    });
};

/**
 * @desc Get single product by ID
 * @route GET /api/v1/products/:id
 */
export const getProductById = (req,res)=>{
    const productId = parseInt(req.params.id, 10);
    const product = mockProducts.find(p=> p.id===productId);

    //Guard clause validation, check if product is available
    if(!product){
        return res.status(404).json({
            status:'fail',
            message: `Product with ID ${productId} not found`
        });
    }
    return res.status(200).json({
        status:'succes',
        data:product
    });
};

/**
 * @desc Create a new product
 * @route POST /api/v1/products
 */
export const createProduct= (req,res)=>{
    //extract & deserialize request body with following fields
    const {name,price,brand}= req.body;

    //guard clause vaidation - check if fields were not parsed in
    if (!price || !name || !brand){
        return res.status(404).json({
            status:'fail',
            message:'missing required fields, please provide name, price and brand'
        });
    }
    //new domain model instance
    const newProduct = {
        id: mockProducts.length +1,
        name: name,
        price: parseFloat(price),
        brand: brand
    };

    // add new product to data arrya
    mockProducts.push(newProduct);

    return res.status(201).json({
        status:'succes',
        data: newProduct
    });
};
