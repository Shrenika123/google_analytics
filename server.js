const express=require('express')
const app=express()
const port=process.env.PORT || 8000
const auth=require('./helper/Auth')
const timer=require('./helper/timer')
// var morgan = require('morgan')
// app.use(morgan('dev'))



// morgan((tokens, req, res) => {
//   console.log("wow")
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//   ].join(' ')
// })

app.get('/reports/pages/',auth,timer,async(req,res)=>{
  try{
    res.setHeader('X-TIME-TO-EXECUTE', req.duration+' ms');
    let countfromUser=req.query.count
    if(isNaN(parseInt(countfromUser)) || parseInt(countfromUser)<0)  
      throw new Error('Invalid query parameter')
      else
    res.status(200).send(req.value)
}
catch(e){
  res.status(404).send(e.message)
}

})

app.get('/reports/users/',auth,timer,async(req,res)=>{
    try{
      res.setHeader('X-TIME-TO-EXECUTE', req.duration+' ms');
      res.status(200).send(req.value)
  }
  catch(e){
    res.status(401).send(e)
  }
    
    })

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})

