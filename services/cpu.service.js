const osu = require('node-os-utils')
const cpu = osu.cpu

const getCpuUsage = async () =>{
    return  cpu.usage()
}

const getCpuModel = () => {
    const cpuModel = cpu.model()
    console.log(cpuModel)
    return cpuModel
}

module.exports = {getCpuUsage, getCpuModel}