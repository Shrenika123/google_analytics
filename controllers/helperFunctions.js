   
let tsv = require("node-tsv-json");

function convert_to_object(){
// let res=[]
// let i=0
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





function uri_pattern_matching(event,val){
    let count=0
    // let set=new Set()
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


function count_uri_matching(event,val){
    // let count=0
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