let authorModel = require("../models/authorModel")
let { isValid,isValidRequestBody,isvalidemail } = require("../validator/validator")
const jwt = require("jsonwebtoken");

let createAuthor = async function (req, res) {
  
  try {
    let requestBody = req.body
    const { fname, lname, title, email, password } = requestBody
    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
    } 

    //-----------------------All varibles validation-------------------------------

    if(!isValid(fname)) { return res.status(400).send({ status: false, msg: "fname is required" }) }
    if(!isValid(lname)) { return res.status(400).send({ status: false, msg: "Lname is required" }) }
    if(!isValid(title)) { return res.status(400).send({ status: false, msg: "Title is required" }) }
    if(!isValid(email)) { return res.status(400).send({ status: false, msg: "Email is required" }) }
    if(!isValid(password)) { return res.status(400).send({ status: false, msg: "Password is required" }) }
    //--------------------- Email validation --------------------------
    if(!isvalidemail(email)){
      return res.status(400).send({ status: false, msg: "please enter valid email" })
    }
    const isEmailAlreadyused = await authorModel.findOne({ email: email })
    if(isEmailAlreadyused) { return res.status(400).send({ status: false, msg: 'Email is already used' }) }
     else {
      let createAuthor = await authorModel.create(requestBody)
      res.status(201).send({ status: true, data: createAuthor })
    }
  }
  catch (error) {
    res.status(500).send({ msz: "Error", error: error.message })
  }
}

//======================================login======================================================
const login = async function (req, res) {
  try {
      const email = req.body.email
      const password = req.body.password
      if (!isValid(email)) {
          return res.status(400).send({ status: false, msg: "pls provide email" })
      }

      if (!isValid(password)) {
          return res.status(400).send({ status: false, msg: "pls provide password" })

      }

      if (email && password) {
          const author = await authorModel.findOne({ email: email, password: password })
          if (author) {
             const token = jwt.sign({ authorId: author._id.toString() },"BlogProject")
              return res.status(200).send({ status: true, token: token })
          }
          else {
              return res.status(401).send({ status: false, msg: "invalid credentials" })
          }
      }
  }
  catch (err) {
      return res.status(500).send({ status: false, msg: err.msg })
  }
}


module.exports.createAuthor = createAuthor
module.exports.login = login