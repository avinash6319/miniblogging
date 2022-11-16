const jwt= require('jsonwebtoken')
const userAuth = async(req,res,next) => {
    try{
        const token = req.headers['x-api-key']
        if(!token){
            return res.status(403).send({status:false,msg:'missing authentication token in request'}) 
        }
        let decoded = await jwt.verify(token,'nasa')
        if(!decoded){ 
            return res.status(403).send({status:false,message:"Invalid authentication token in request"})
        }
        next()
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}
module.exports = userAuth