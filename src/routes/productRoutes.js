import express from 'express';

//1. create an isolated routern instance for products
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
        status:'succes',
        data:product
    });
});

//4. export router instance so the main app can mount it 
export default router;