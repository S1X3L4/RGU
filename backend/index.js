//https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
const Entry = require('../backend/entities/entries.js');
var path = require('path');
var express = require('express');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


var app = express();

var options = {
    index: "myWebPage.html"
  };

var dir = path.join(__dirname, '../frontend');



app.get('/api', function(req, res){
    res.send("Yes we have an API now")
});

// e.g. test using:
//http://127.0.0.1:8000/api/getPrice?salary=2000&days=20
app.get('/api/getPrice', async function(req, res){
   
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    let finalPrice = 0;
    dailyRate = s/365;
    price = Math.round(dailyRate * d);
    var roundToNearest = 50;
    roundedPrice = Math.round((price+roundToNearest)/roundToNearest) * roundToNearest // Always round up
    res.send(""+roundedPrice)
    console.log('s:', s)

    const entry = new Entry({ salary: s, days: d, price: roundedPrice });
    try {
        await entry.save();
        console.log("Entry saved");
    } catch (err) {
        console.log(err);
    }
});

app.use(express.static(dir, options));

// 404 page
app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(8000, function () {
    console.log('Listening on http://localhost:8000/');
});
