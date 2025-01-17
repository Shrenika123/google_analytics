/**
*Middleware for calculating total time taken by ap t to execute and add header X-TIME-To-EXECUTE heaser to response
*/

const main1=require('../services/functinality')

const timer=async(req,res,next)=>{
try{

    var start = Date.now();
    let res1
    let orderBy = await req.query.orderBy;
    let value = await req.query.count;
    if(req.path==="/reports/pages/")
    {
        if(orderBy==='views')
            res1=await main1.getMostPageView(value)
        else
        {
            res1=await main1.getMostTimeSpentPages(value)
        }
}

    else if(req.path==="/reports/users/")
    {   
        res1=await main1.getTopActiveUsers(value)
    }
    req.value=res1
    var duration = Date.now() - start;
    req.duration=duration
    next()
}
catch(e){
        res.status(401).send(e)
    }

}

module.exports=timer



