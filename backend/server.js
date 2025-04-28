const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// API route
app.use('/api/users', require('./routes/userRoutes'));
