const main=require('../controllers/helperFunctions')

async function getMostTimeSpentPages(value) {
  let countAsRequested=value
  let sortedArray= await main.sortValue('event_value')
  let events=await main.uri_pattern_matching(sortedArray,countAsRequested)
  return events
}



async function getMostPageView(value){
    let countAsRequested=value
    let sortedArray= await main.sortValue('event_value')
    let resMap=await main.count_uri_matching(sortedArray,countAsRequested)
    return resMap
}


async function getTopActiveUsers(value){
    let countAsRequested=value
    let sortedArray= await main.sortValue('tstamp')
    let resArrayUuid=await main.mapCreate(sortedArray,countAsRequested)
    return resArrayUuid
}
// getMostTimeSpentPages()

module.exports={getMostTimeSpentPages,getTopActiveUsers,getMostPageView}