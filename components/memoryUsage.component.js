const contrib  = require('blessed-contrib')
const {getMemoryUsage} = require("../services/memory.service");
const {getPercentageColor} = require("../helpers/getPercentageColor");
const initComponentRender = (grid) => {
    const donut = grid.set(0,2,1,2, contrib.donut, {
        label: 'MEM',
        radius: 10,
        arcWidth: 3,
        yPadding: 3,
        data: [
            {percent: 0, label: ' ', color:[255,200,170]}
        ]
    })
    rerenderComponent(donut)
    return donut
}

const rerenderComponent = async (donut) => {
    const memoryUsage = await getMemoryUsage()
    const percentage = (memoryUsage.usedMemMb/memoryUsage.totalMemMb * 100).toFixed(2)
    donut.setData([
        {percent: percentage, label: ' ', color: getPercentageColor(percentage)},
    ]);
    setTimeout(() => rerenderComponent(donut), 1000)
}

module.exports = {initComponentRender}