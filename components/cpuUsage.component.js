const contrib = require('blessed-contrib')
const {getCpuUsage} = require("../services/cpu.service");
const {getPercentageColor} = require('../helpers/getPercentageColor')
const initComponentRender = grid => {
    const donut = grid.set(0, 0, 1, 2, contrib.donut, {
        label: 'CPU',
        radius: 10,
        arcWidth: 3,
        yPadding: 3,
        data: [
            {percent: 0, label: ' ', color: [100, 200, 170]}
        ]
    })
    rerenderComponent(donut)
    return donut
}

const rerenderComponent = async donut => {
    const cpuUsage = await getCpuUsage()
    const percentage = cpuUsage < 1 ? 1.49 : cpuUsage
    donut.setData([
        {percent: percentage, label: ' ', color: getPercentageColor(percentage)},
    ]);
    setTimeout(() => rerenderComponent(donut), 1000)
}

module.exports = {initComponentRender}