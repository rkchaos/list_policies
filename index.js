const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const axios = require("axios");

const app = express();


mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB!'));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PolicySchema = new mongoose.Schema({
    policyName: String,
    policyType: String,
    policyDescription: String,
});

app.post('/allPolicies',async(req,res)=>{
    
})



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
