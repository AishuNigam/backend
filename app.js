const express = require("express");
const mongoose = require('mongoose');
const userModel = require('./users');

mongoose.connect("mongodb://mongoadmin:iZNZFRlvGAjMtL7Rp7d98g7q7@3.108.137.37:22018/aishwary-test?authSource=admin&retryWrites=true&w=majority");

mongoose.connection.on('connected', function () {
    console.log('Database connected');
});


const app = express();
app.use(express.json());

app.get('/list', async (req, res) => {
    const data = await userModel.find();
    res.send({ message: "Data fetched", data: data });
})

app.post('/save', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const docData = new userModel();

    docData.name = data.name;
    docData.email = data.email;

    await docData.save();
    res.send({ message: "Saved" })
})

app.delete('/delete/:_id', async (req, res) => {
    const data = req.params._id
    
    await userModel.deleteOne({_id: data});


    res.send({ message: "Deleted" })
})


app.listen(3003, (err) => {
    if (err) {
        console.log('Error while staring server. Reason: ' + err.message);
    }
    console.log('Server started');
})