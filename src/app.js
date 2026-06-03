import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/v1/health',(req,res)=>{
    return res.status(200).json({status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT,()=>{
    console.log(`core-store server running on http://localhost:${PORT}`)
})