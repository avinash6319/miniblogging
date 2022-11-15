let authorModel = require("../models/authorModel")
let valid = require("../validator/validator")


let createAuthor = async function (req, res) {
    let Data = req.body
    const { fname , lname , title , email , password } = Data
    const isEmailAlreadyused = await authorModel.findOne({ email: email })
    const objKey = Object.keys(Data).length
    try {

 //-----------------------Data in body || not-------------------------------

        if (objKey === 0)
         { return res.satus(400).send({ status: false, msg: "No Data in requestBody" }) }

 //----------------------- validation-------------------------------

        else if (!fname) 
        { return res.status(400).send({ status: false, msg: "fname is required" }) }

        else if (!lname)
        { return res.status(400).send({ status: false, msg: "Lname is required" }) }

        else if (!title) 
        { return res.status(400).send({ status: false, msg: "Title is required" }) }

        else if (!email) 
        { return res.satus.send({ status: false, msg: "Email is required" }) }

        else if (!password) 
        { return res.satus.send({ status: false, msg: "Password is required" }) }

        //--------------------- Email validation --------------------------

        else if (!valid.isValidEmail(email))
         { return res.status(400).send({ status: false, msg: "Email is not vaild" })}


        else if (isEmailAlreadyused)
         { return res.status(400).send({ status: false, msg: 'Email is already used' }) }

        else {
            let createAuthor = await authorModel.create(Data)
            res.status(201).send({ status: true, msg: createAuthor })
        }
    }
    catch (error) {
        res.status(500).send({ msz: "Error", error: error.message })
    }
}


module.exports.createAuthor = createAuthor