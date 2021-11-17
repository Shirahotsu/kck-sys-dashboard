const osu = require('node-os-utils')
const memory = osu.mem

const  getMemoryUsage = async () =>{
    const memoryUsage = await memory.info()
    // console.log(memoryUsage)
    return {
        totalMemMb:memoryUsage?.totalMemMb,
        usedMemMb:memoryUsage?.usedMemMb,
        freeMemMb:memoryUsage?.freeMemMb,
        freeMemPercentage: memoryUsage?.freeMemPercentage
    }
}

module.exports = {getMemoryUsage}