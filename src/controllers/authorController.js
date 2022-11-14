const model = require("../models/authorModel")
const author = async function(req, res){
    try{
    let data = req.body
    if(data){
    let savedData = await model.create(data)
    res.status(201).send({msg:savedData})
    } else 
    res.status(400).send({msg: "Bad Request"})
}
catch(error){
    res.status(500).send({status:false, msg: error.message})
}
}

module.exports.author = author;