var fs = require('fs');
var sort = require('sort-stream');
var parse = require('csv-parse');
var transform = require('stream-transform');
const util = require('util');

// var performance = require('performance')
require('yargs');

const operations = process.argv[2]
const user_input_count = process.argv[3]
let map = new Map()
let sortArray = []
let monthsFlag=false
let startDate
let endDate




if (operations !== null) {
    main2()
}
// mm/dd/yyyy

function checkDateRange(row){
var dateFrom = startDate;
var dateTo = endDate;
var dateCheck = row[3].toString();
var d1 = dateFrom.split("-");
var d2 = dateTo.split("-");
var c = dateCheck.split("-");

var from = new Date(d1[0], parseInt(d1[1])-1, d1[2]);  // -1 because months are from 0 to 11
var to   = new Date(d2[0], parseInt(d2[1])-1, d2[2]);
var check = new Date(c[0], parseInt(c[1])-1, c[2]);

return (check >= from && check < to)

}



function uri_pattern_matching(row){
    let query_operator_present = row[row.length - 2].indexOf('?')
    let resource_path_is_variable

    let buffer = row[row.length - 2].split('/')

    if (buffer[2])
        resource_path_is_variable = buffer[2].length > 35

    if (resource_path_is_variable)
        row[row.length - 2] = '/' + buffer[0] + buffer[1] + '/'

    if (!resource_path_is_variable && query_operator_present >= 0) {
        let removed_query_operator_array= row[row.length - 2].slice(0, query_operator_present)
        row[row.length - 2] = removed_query_operator_array
    }
}




function mapCreate(row) {

    if (!map.has(row[row.length - 2])) {
        map.set(row[row.length - 2], 1)


    }
    else {
        map.set(row[row.length - 2], map.get(row[row.length - 2]) + 1)

    }
}




 function getMostTimeSpentPages(query_count_input) {
    let i = 0
    let res=[]
    let count
    let set=new Set
    monthFlag=false
    if(!user_input_count)
    count=parseInt(query_count_input)
    else
    count = parseInt(user_input_count)
    
    let start = new Date().getTime();
    return new Promise(function(resolve, reject){
    fs.createReadStream('./events1.tsv',()=>{

    })
        .pipe(parse({
            delimiter: '\t'
        }))
        .pipe(sort(function (a, b) {
            if (parseInt(a[8]) < parseInt(b[8]))
                return 1
            else
                return -1
        }

        ))
        .pipe(transform(function (row) {

     
            uri_pattern_matching(row)
            
           
           if(monthsFlag)
          {  
            let flag=checkDateRange(row)
           if(flag)
           if(!set.has(row[row.length - 2]))
            {  set.add(row[row.length - 2])
                i++
  
                  if (i <= count+1) {
                      if (i !== 1) {
                          console.log(i - 1)
                          console.log(row.join('  ') + '\r')
                          res.push(row)
                      }
                      else
                          console.log(row.join('  ') + '\r')
                  }
                  if (i === count+1) {
                      return
                  }
                }
          }
          else{
            if(!set.has(row[row.length - 2]))
          {  set.add(row[row.length - 2])
              i++

                if (i <= count+1) {
                    if (i !== 1) {
                        console.log(i - 1)
                        console.log(row.join('  ') + '\r')
                        res.push(row)
                    }
                    else
                        console.log(row.join('  ') + '\r')
                }
                if (i === count+1) {
                    return
                }
        }
     }
    
    })).on('finish',()=>{
            let end = new Date().getTime();
                let time = end - start;
                console.log(('Execution time: ' + time+' ms')
                )
                resolve(res,()=>{
                    res
                    
                })

        })
    })
}




//function used to retrive the n values based on the get Top Active Users 
function getTopActiveUsers(query_count_input) {

    let i = 0
    let count=0

    if(!user_input_count)
    count=parseInt(query_count_input)
    else
    count = parseInt(user_input_count)

    let arr_res = []
    let res1=[]
    let n = 0


    let start = new Date().getTime();
    return new Promise(function(resolve, reject){
    fs.createReadStream('./events1.tsv')
 
        .pipe(parse({
            delimiter: '\t'
        }))
        .pipe(sort(function (a, b) {
            if (parseInt(a[8]) < parseInt(b[8]))
                return 1
            else
                return -1
        }))
       
        .pipe(transform(function (row) {
                i++

                if (i <= count+1) {
                    if (i !== 1) {

                        if (!arr_res.includes(row[0])) {
                            console.log(i - 1)

                            arr_res.push(row[0])
                            console.log(row.join('  ') + '\r')
                        }
                        else{
                            i--
                        }
                    }
                    else {
                        console.log("active users")
                        // console.log(row.join('  ') + '\r')
                        console.log(row[0])
                    }
                }
                if (i === count+1) {
                    return
                }
            
           
            
        })).on('finish',()=>{
            let end = new Date().getTime();
            // console.log(arr_res)
                let time = end - start;
                console.log(('Execution time: ' + time+' ms')
                )
                resolve(arr_res,()=>{
                    arr_res
                })

        })
    })
}




function getMostPageView(query_count_input) {
    map.clear()
    if(!user_input_count)
    count=parseInt(query_count_input)
    else
    count = parseInt(user_input_count)
    let start = new Date().getTime();

    return new Promise(function(resolve, reject){
    fs.createReadStream('./events1.tsv')
        
        .pipe(parse({
            delimiter: '\t'
        }))

        .pipe(transform(function (row) {
            mapCreate(row)
        }))

        .on('finish', () => {
            console.log("page view")

            const tempArray = [...map.entries()]
            tempArray.sort((a, b) => {
                if (a[1] < b[1])
                    return 1
                else
                    return -1

            })

            let tempArray1=tempArray.slice(0,count)
            for (let i = 0; i < count; i++) {
                console.log(tempArray[i])
            }
            let end = new Date().getTime();
                let time = end - start;
                console.log(('Execution time: ' + time+' ms')
                )
                resolve(tempArray1,()=>{
                    tempArray1
                })

     }) })
}




async function getLastQauter(startDate1,endDate1) {
   monthsFlag=true
   startDate=startDate1
   endDate=endDate1
   await getMostTimeSpentPages()


}

getLastQauter("2018-02-25","2018-03-06")

function main2() {


    switch (operations) {
        case 'getMostTimeSpentPages': getMostTimeSpentPages()
            break;
        case 'getTopActiveUsers': getTopActiveUsers()
            break;
        case 'getMostPageView': getMostPageView()
            break;
        case 'getLastQauter': getLastQauter()
            break;


    }
    // await getMostTimeSpentPages()

}




module.exports={getMostTimeSpentPages,getTopActiveUsers,getMostPageView}