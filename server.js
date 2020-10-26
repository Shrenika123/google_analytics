const express=require('express')
const app=express()
const port=process.env.PORT || 8000
const auth=require('./helper/Auth')
const timer=require('./helper/timer')
var morgan = require('morgan')
var winston = require('winston');

app.use(morgan('dev'))



var logger = winston.createLogger({
  transports: [
      new winston.transports.File({
          level: 'info',
          filename: './logs/all-logs.log',
          handleExceptions: true,
          json: true,
          maxsize: 5242880,
          maxFiles: 5,
          colorize: false
      }),
      new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true
      })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
      logger.info(message);
  }
};

app.use(require("morgan")("combined", { "stream": logger.stream }));




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

