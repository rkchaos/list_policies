const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const axios = require("axios");
const { ObjectId } = require('mongoose').Types;

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
const Policy = mongoose.model('Policy', PolicySchema);


app.post('/allPolicies', async (req, res) => {
    try {
        const excludedId = '6777932ef2013d3cfcc27347';

   
        if (!ObjectId.isValid(excludedId)) {
            return res.status(400).json({ msg: "Invalid ObjectId format" });
        }

        const policies = await Policy.find(
            { _id: { $ne: new ObjectId(excludedId) } }, // Exclude the specified ID
            { form: 0, dataFormat: 0, createdAt: 0, updatedAt: 0, __v: 0 } // Exclude fields from the result
        );

        console.log(policies);

        const policyDetails = policies.map(policy => ({
            policyName: policy.policyName,
            policyType: policy.policyType,
            policyDescription: policy.policyDescription
        }));

        res.status(200).json({ msg: "ok", policies: policyDetails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});






app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
