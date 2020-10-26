let tsv = require("node-tsv-json");

/**
*converts an tsv file to array of JSON Objects taking tsv file as input
*@return {Object} array of JSON Objects
*/
function convert_to_object(){
return new Promise((resolve)=>{
  
    tsv({
        input: "./events1.tsv", 
        output: null
      }, function(err, result) {
        if(err) {
          console.error(err);
        }else {
            resolve(result)
        }
   })
})
}

/**
*Sorts the array of objects based on the type passed
*@param {String} type field on which the event Array should be sorted
*@return {Object} array of sorted JSON Objects
*/
async function sortValue(type){
    let object=await convert_to_object()
    // console.log(r)
    if(type==='event_value'){
    object.sort((a,b)=>{
       if( parseInt(a.event_value) <parseInt(b.event_value))
       return 1
       else
       return -1
    })
  }
    else
    {
        object.sort((a,b)=>{
            return new Date(b.tstamp) - new Date(a.tstamp);
         })
    }
   return object
}

/**
*Function that checks the pattern of uri to get unique pages
*@param {Array} event sorted Array of objects(Events) based on event_value
*@param {Number} val count required by the user
*@return {Object} array events with high page viewv equal to users count
*/
function uri_pattern_matching(event,val){
let count=0
let resArray=[]
   
let set=new Set;
for(let i=0;i<event.length;i++){
  let split_path=event[i]['location'].split('/');
  let string='/';
  for(let j=1;j<split_path.length;j++){
    if(split_path[j].includes('?') ||split_path[j].includes('+')|| split_path[j].length > 15 || (split_path[j] === '' && j !== 1))
    break;
    else if(split_path[1] === ''){
      break;
    }
    else 
    string+=split_path[j]+'/';
  }
  if(!set.has(string))
  {set.add(string);
   count++
   resArray.push(event[i])
  }
  if(count===parseInt(val))
  return resArray
}
return resArray
}


/**
*Getting count of the page views
*@param {Array} event sorted Array of objects(Events) based on event_value
*@param {Number} val count required by the user
*@return {Map} returns the page count equal to users input for pages viewed most
*/
function count_uri_matching(event,val){
    let count=0
    let map=new Map()
    let objRes=[]

    for(let i=0;i<event.length;i++){
        let split_path=event[i]['location'].split('/');
        let string='/';
        for(let j=1;j<split_path.length;j++){
          if(split_path[j].includes('?') ||split_path[j].includes('+') || split_path[j].length > 15 || (split_path[j] === '' && j !== 1))
          break;
          else if(split_path[1] === ''){
            break;
          }
          else 
          string+=split_path[j]+'/';
        }
        if(!map.has(string))
        {map.set(string,1);
        }
        else{
            map.set(string,map.get(string)+1)
        }
        
      }
      let mapAsc = new Map([...map.entries()].sort((a,b) => {
            if(a[1]<b[1])
            return 1
            else
            return -1
        }))
        for (let mapValue of mapAsc.entries()) {
            
            if(count===parseInt(val))
            {
                return objRes
            }
            objRes.push(Object.assign({},mapValue))
            count++
          }
        return objRes
}


/**
*Getting most active users
*@param {Array} event sorted Array of objects(Events) based on timetamp
*@param {Number} val count required by the user
*@return {Array} array containing most active user equal to users count
*/
function mapCreate(event,val) {
let arr=[]
let count=0
let set=new Set()

for(let i=0;i<event.length;i++)
{
    if(count===parseInt(val))
    {
        return arr
    }
    else if (!set.has(event[i]['uuid'])) {
        count++;
        set.add(event[i]['uuid'])
        arr.push(event[i]['uuid'])
    }
}
return arr
}

module.exports={sortValue,uri_pattern_matching,count_uri_matching,mapCreate,convert_to_object}