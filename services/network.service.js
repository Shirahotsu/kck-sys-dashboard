const checkInternetConnected = require('check-internet-connected');
const osu = require('node-os-utils')
const netstat = osu.netstat

const  getIsInternetConnected = async () =>{
    const config = {
        timeout: 5000,
        retries: 5,
        domain: 'https://google.com'
    }
    try{
        await checkInternetConnected(config)
        // console.log('CONNECTED')
        return true

    } catch(e){
        // console.log('NOT CONNECTED')
        return false
    }
}

const getConnectionSpeed = async () => {
    const stats = await netstat.stats()
    console.log(stats)
    return stats

}

module.exports = {getIsInternetConnected, getConnectionSpeed}