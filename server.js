const express=require('express')
const app=express()
const port=process.env.PORT || 8000
const auth=require('./helper/Auth')
const timer=require('./helper/timer')
var morgan = require('morgan')
var winston = require('winston');
var jsonObject=require('./controllers/helperFunctions')
var pg = require('pg');

var conString = "postgres://admin1:admin1@localhost:5432/test_db";

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
  write: function(message){
      logger.info(message);
  }
};


function connectToDB(){
var client = new pg.Client(conString);
return client
}

app.post('/',async ()=>{
   let client=await connectToDB()
   let resVal=await jsonObject.convert_to_object()
   let keys=Object.keys(resVal[1])
  await client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    
      client.query(`CREATE TABLE IF NOT EXISTS events(${keys[0]} varchar,${keys[1]} varchar,${keys[2]} varchar,${keys[3]} varchar,${keys[4]} varchar,${keys[5]} varchar,${keys[6]} varchar,${keys[7]} varchar,${keys[8]} varchar,${keys[9]} varchar,${keys[10]} varchar,${keys[11]} varchar,${keys[12]} varchar)`);
   for(let i=1;i<resVal.length;i++){
      console.log(`${keys[0]}`)
      client.query(`INSERT INTO  events("${keys[0]}","${keys[1]}","${keys[2]}","${keys[3]}","${keys[4]}","${keys[5]}","${keys[6]}","${keys[7]}","${keys[8]}","${keys[9]}","${keys[10]}","${keys[11]}","${keys[12]}") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`, [resVal[i][keys[0]],resVal[i][keys[1]],resVal[i][keys[2]],resVal[i][keys[3]],resVal[i][keys[4]],resVal[i][keys[5]],resVal[i][keys[6]],resVal[i][keys[7]],resVal[i][keys[8]],resVal[i][keys[9]],resVal[i][keys[10]],resVal[i][keys[11]],resVal[i][keys[12]]]
         , function(err) {
              if(err) {
              return console.error('error running query', err);
        }
      });
    }
  })
})


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

