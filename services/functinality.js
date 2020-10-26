const main=require('./helperFunctions')

/**
*Function for getting pages where most time was spent
*/
async function getMostTimeSpentPages(value) {
  let countAsRequested=value
  let sortedArray= await main.sortValue('event_value')
  let events=await main.uri_pattern_matching(sortedArray,countAsRequested)
  return events
}

/**
*Function for getting most viewed pages
*/
async function getMostPageView(value){
    let countAsRequested=value
    let sortedArray= await main.sortValue('event_value')
    let resMap=await main.count_uri_matching(sortedArray,countAsRequested)
    return resMap
}

/**
*Function for getting most active users
*/
async function getTopActiveUsers(value){
    let countAsRequested=value
    let sortedArray= await main.sortValue('tstamp')
    let resArrayUuid=await main.mapCreate(sortedArray,countAsRequested)
    return resArrayUuid
}

module.exports={getMostTimeSpentPages,getTopActiveUsers,getMostPageView}