const auth=async(req,res,next)=>{
    try{
         let token=await req.header('X-Auth-Token')
        if(!req.header('X-Auth-Token')|| ( token!=="not_so_secret_key"))
        throw error("please authenticate")
        next()

    }
    catch(e){
        res.status(401).send("please authenticate")
    }
}

module.exports=auth

