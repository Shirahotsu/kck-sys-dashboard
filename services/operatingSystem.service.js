const osu = require('node-os-utils')
const os = osu.os

const getOperatingSystem = async () => {
    const operatingSystem = await os.oos()
    // console.log(operatingSystem)
    return operatingSystem
}

const getIp = () => {
    const test = os.ip()
    // console.log(test)
    return test
}
const getHostname = () => {
    const test = os.hostname()
    // console.log(test)
    return test
}
const getUptime = () => {
    const time = getReadableTimeValue(os.uptime())
    // console.log(time)
    return time
}
const getArch = () => {
    const test = os.arch()
    // console.log(test)
    return test
}

const getReadableTimeValue = (time) => new Date(time * 1000).toISOString().substr(11, 8);

module.exports = {getOperatingSystem, getIp, getHostname, getUptime, getArch}