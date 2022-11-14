const express = require('express')
const bodyparser = require('body-parser')
const route = require("./routes/route")
const { default: mongoose } = require('mongoose');
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://AbhijitRadke:7768916626@cluster0.v76zsxi.mongodb.net/adb", {
    useNewUrlParser: true
})
    .then(() => console.log("Monfoose is connected"))
    .catch(err => console.log(err));


app.use("/", route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app runing on poart" + (process.env.PORT || 3000))
})

