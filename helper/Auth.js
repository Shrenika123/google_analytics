/**
*Middleware for Authentication for web ApI using X-Auth-Token
*On Auth failure will return "please Authenticate"
*/

const auth=async(req,res,next)=>{
    try{
         let token=await req.header('X-Auth-Token')
        if(!req.header('X-Auth-Token')|| ( token!=="not_so_secret_key"))
        throw new Error("please authenticate")
        next()

    }
    catch(e){
        res.status(401).send(e.message)
    }
}

module.exports=auth

