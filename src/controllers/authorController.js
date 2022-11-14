const authorModel = require("../models/authorModel")
const createAuthor = async function(req, res){
    try{
    let data = req.body
    if(data){
    let savedData = await authorModel.create(data)
    res.status(201).send({msg:savedData})
    } else 
    res.status(400).send({msg: "Bad Request"})
}
catch(error){
    res.status(500).send({status:false, msg: error.message})
}
}

module.exports.createAuthor = createAuthor;