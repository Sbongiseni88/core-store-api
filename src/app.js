import express from 'express';
import productRouter from './routes/productRoutes.js'// because we used a default export, we can name the import anything we want

const app = express();
const PORT = 3000;

//mount product router onto a specific path
app.use('/api/vq/products',productRouter);
app.get('/api/v1/health',(req,res)=>{
    return res.status(200).json({status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT,()=>{
    console.log(`core-store server running on http://localhost:${PORT}`)
})