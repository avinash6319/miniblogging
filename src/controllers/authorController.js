let authorModel = require("../models/authorModel")
let valid = require("../validator/validator")
const jwt = require("jsonwebtoken")


let createAuthor = async function (req, res) {
    let Data = req.body
    const { fname, lname, title, email, password } = Data
    const isEmailAlreadyused = await authorModel.findOne({ email: email })
    const objKey = Object.keys(Data).length
    try {

        //-----------------------Data in body || not-------------------------------

        if (objKey === 0) { return res.satus(400).send({ status: false, msg: "No Data in requestBody" }) }

        //----------------------- validation-------------------------------

        else if (!valid.isValidName(fname)) { return res.status(400).send({ status: false, msg: "fname is required" }) }

        else if (!valid.isValidName(lname)) { return res.status(400).send({ status: false, msg: "Lname is required" }) }

        else if (!valid.isValid(title)) { return res.status(400).send({ status: false, msg: "Title is required" }) }

        else if (!valid.isValid(email)) { return res.satus.send({ status: false, msg: "Email is required" }) }

        else if (!valid.isValid(password)) { return res.satus.send({ status: false, msg: "Password is required" }) }

        //--------------------- Email validation --------------------------

        else if (!valid.isValidEmail(email)) { return res.status(400).send({ status: false, msg: "Email is not vaild" }) }


        else if (isEmailAlreadyused) { return res.status(400).send({ status: false, msg: 'Email is already used' }) }

        else {
            let createAuthor = await authorModel.create(Data)
            res.status(201).send({ status: true, msg: createAuthor })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

//    **************************login api *************************

const login = async function (req, res) {
    try {
        const email = req.body.email
        const password = req.body.password


        if (!valid.isValid(email)) {
            return res.status(400).send({ status: false, msg: "pls provide email" })

        }

        if (!valid.isValid(password)) {
            return res.status(400).send({ status: false, msg: "pls provide password" })

        }

        if (email && password) {
            const author = await authorModel.findOne({ email: email, password: password })
            if (author) {
                const token = jwt.sign({ authorId: author._id }, 'nasa')
                res.setHeader("x-api-key", token);
                return res.status(200).send({ status: true, token: token })
            }
            else {
                return res.status(500).send({ status: false, msg: "invalid credentials" })
            }
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}




module.exports.createAuthor = createAuthor
module.exports.login = login