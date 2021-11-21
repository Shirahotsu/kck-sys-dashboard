const blessed = require('blessed')
const contrib = require('blessed-contrib')
const program = blessed.program()

const {initComponentRender: initBasicInfoRender} = require('./components/basicInfo.component')
const {initComponentRender: initCpuUsageRender} = require('./components/cpuUsage.component')
const {initComponentRender: initMemoryUsageRender} = require('./components/memoryUsage.component')
const {initComponentRender: initDiskUsageRender} = require('./components/diskUsage.component')

const {
    initComponentRender: initDynamicInfoRender,
    setVisibility: setDynamicBoxVisibility
} = require('./components/dynamicInfoBox.component')
const {
    initComponentRender: initDiskDetailsRender,
    setVisibility: setDiskDetailsVisibility
} = require('./components/diskDetails.component')
const {
    initComponentRender: initMemoryDetailsRender,
    setVisibility: setMemoryDetailsVisibility
} = require('./components/memoryDetails.component')

const {
    initComponentRender: initCpuDetailsRender,
    setVisibility: setCpuDetailsVisibility
} = require('./components/cpuDetails.component')


const screen = blessed.screen({smartCSR: true})

const renderViews = () => {
    const grid = new contrib.grid({rows: 2, cols: 6, screen: screen})

    const cpu = initCpuUsageRender(grid)
    const memory = initMemoryUsageRender(grid)
    const disk = initDiskUsageRender(grid)

    initDiskDetailsRender(grid)
    initMemoryDetailsRender(grid)
    initCpuDetailsRender(grid)

    setClickListeners(cpu, memory, disk)

    initBasicInfoRender(grid)
    initDynamicInfoRender(grid)
}

const setClickListeners = (cpu, memory, disk) => {

    cpu.on('click', function () {
        hideEveryThing()
        setCpuDetailsVisibility(false)
    })
    memory.on('click', function () {
        hideEveryThing()
        setMemoryDetailsVisibility(false)
    })
    disk.on('click', function () {
        hideEveryThing()
        setDiskDetailsVisibility(false)
    })
}
const hideEveryThing = () => {
    setDynamicBoxVisibility(true)
    setDiskDetailsVisibility(true)
    setMemoryDetailsVisibility(true)
    setCpuDetailsVisibility(true)
}

renderViews()


screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

let timer = null
program.on('resize', ()=>{
    clearTimeout(timer)
    timer = setTimeout(()=>{
        renderViews()
    }, 300)
})

setInterval(() => screen.render(), 1000)