const operations = process.argv[2]
const user_input_count = process.argv[3]
const main1=require('./services/functinality')
require('yargs');

if (operations !== null) {
    main2()
}

async function getMostTimeSpentPagesCli(){
    let start = new Date().getTime();
    let r=await main1.getMostTimeSpentPages(user_input_count)
    console.log(r)
    let end = new Date().getTime();
    let time = end - start;
    console.log(('Execution time: ' + time+' ms'))
}

async function getTopActiveUsersCli(){
    let start = new Date().getTime();
    let r=await main1.getTopActiveUsers(user_input_count)
    console.log(r)
    let end = new Date().getTime();
    let time = end - start;
    console.log(('Execution time: ' + time+' ms'))
}
async function getMostPageViewCli(){
    let start = new Date().getTime();
    let r=await main1.getMostPageView(user_input_count)
    console.log(r)
    let end = new Date().getTime();
    let time = end - start;
    console.log(('Execution time: ' + time+' ms'))
}

async function main2() {


    switch (operations) {
        case 'getMostTimeSpentPages': getMostTimeSpentPagesCli()
                break;
        case 'getTopActiveUsers': getTopActiveUsersCli()
            break;
        case 'getMostPageView': getMostPageViewCli()
            break;
        // case 'getLastQauter': getLastQauterCli()
        //     break;
    }

}