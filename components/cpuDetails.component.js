const blessed = require('blessed')
const contrib = require('blessed-contrib')

const {getCpuUsage} = require("../services/cpu.service");
let details
const cpuPercentageUsed = []
const baseData = [ { title: ' ',
    x: [],
    y: [],
    style: {
        line: 'red'
    }
}]

const initComponentRender = (grid) => {
    details = grid.set(1, 2, 1, 4, contrib.line, {
        label: 'CPU DETAILS',
        content:``,
        hidden:true,
        padding:{
            left:1,
            right:1
        },
        style: {
            fg: 'white',
            border: {
                fg: '#f0f0f0'
            },
            line: "yellow",
            text: "green",
            baseline: "black"
        },
        xLabelPadding: 3,
        xPadding: 5,
        numYLabels:5,
        maxY: 100,
        showLegend: true,
        wholeNumbersOnly: false, //true=do not show fraction in y axis,
    })
    details.setData(baseData)
    rerenderComponent()
    return details
}

const rerenderComponent = async () => {
    const cpuUsage = await getCpuUsage()
    if(cpuPercentageUsed.length>=10){
        cpuPercentageUsed.shift()
        cpuPercentageUsed.push(cpuUsage)
    } else {
        cpuPercentageUsed.push(cpuUsage)
    }
    baseData[0].x = cpuPercentageUsed.map(e=>' ')
    baseData[0].y = cpuPercentageUsed
    details.setData(baseData)
    setTimeout(() => rerenderComponent(), 1000)
}

const setVisibility = hidden => {
    if(!details) return
    details.hidden = hidden
}

module.exports = {initComponentRender, setVisibility}