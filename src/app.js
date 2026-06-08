import express from 'express';
import 'dotenv/config'
import productRouter from './routes/productRoutes.js'// because we used a default export, we can name the import anything we want

const app = express();
const PORT = process.env.PORT || 3000;

//Global middleware - parses incoming raw request strings nto clean JS objects on req.body
app.use(express.json());

//mount product router onto a specific path
app.use('/api/v1/products',productRouter);
app.get('/api/v1/health',(req,res)=>{
    return res.status(200).json({status: 'healthy',
        enviroment: process.env.NODE_ENV || 'production',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT,()=>{
    console.log(`core-store server running in [${process.env.NODE_ENV || 'production'}] on http://localhost:${PORT}`)
})
