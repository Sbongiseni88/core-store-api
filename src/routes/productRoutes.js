import express from 'express';

//1. create an isolated router instance for products
const router = express.Router();

//mock data array to act as temp database
const mockProducts= [
    {id:1, name:'All-Purpose Cement', price:120.00, brand: 'AfriSam'},
    {id:2, name:'Build-Crate Cement', price:100.00, brand: 'PPC'}
];

//2. define a route to get all products. ( /api/v1/products)
router.get('/',(req,res)=>{
    return res.status(200).json({
        status: 'success',
        result: mockProducts.length,
        data: mockProducts
    });
});

//3. define a route with dynamic parameter
router.get('/:id',(req,res)=>{
    /**
     * access the value of the id parameter from the url, which is initially a string
     * converts the string into int
     * specifies that the number is in base 10 (decimal), without base 10, JS might incorrectly interpret the number as an octal (base 8), if string starts with 0
     * 
     */
    const productId = parseInt(req.params.id,10);

    //search database forproduct matching the id
    const product = mockProducts.find(p=> p.id===productId); // callback function represents the current product object being evaluated in each teration

    //Guard clause- check for FAIL-FAST principle first, if resource doesnt exist exit with 404
    if (!product){
        return res.status(404).json({
            status:'fail',
            message:`Product with ID ${productId} not found`
        });
    }
    //if found return the data payload with 200 status 
    return res.status(200).json({
        status:'success',
        data:product
    });
});
//4. Define a route to create a new product
router.post('/',(req,res)=>{
    //extract raw fields out of the pre-parsed req.body object
    const {name,price,brand}= req.body;

    //guard clause validation - critical fields must be present before modifying our data
    if (!name || !price || !brand){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing required fields. Please provide name, price, and brand'
        });
    }

    //new domain model instance
    const newProduct={
        id: mockProducts.length + 1, //auto increment for mock data
        name: name,
        price: parseFloat(price),
        brand:brand
    };

    //push new item into our server memory array
    mockProducts.push(newProduct);

    //return 201 Created status code along with new resource payload
    return res.status(201).json({
        status: 'success',
        data: newProduct
    })
})


// export router instance so the main app can mount it 
export default router;