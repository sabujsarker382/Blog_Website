const express = require('express');
const cors= require('cors');
const mongoose=require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewear 
app.use(cors());
app.use(express.json());

//database connection
mongoose.connect(process.env.Mongo_uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDB connected")
    app.listen(PORT,()=>{
        console.log(`Server is running at port ${PORT}`);
    })

}).catch(err=>console.log(err));


app.get('/', (req,res)=>{
    res.send('Server is running')
})

