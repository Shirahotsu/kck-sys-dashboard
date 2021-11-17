const contrib  = require('blessed-contrib')
const {getDiskUsage} = require("../services/disk.service");
const {getPercentageColor} = require("../helpers/getPercentageColor");
const initComponentRender = (grid) => {
    const donut = grid.set(0,4,1,2, contrib.donut, {
        label: 'HARD DRIVE',
        radius: 10,
        arcWidth: 3,
        yPadding: 3,
        data: [
            {percent: 0, label: ' ', color:[255,200,170]}
        ],
    })
    rerenderComponent(donut)
    return donut
}

const rerenderComponent = async (donut) => {
    const {usedPercentage} = await getDiskUsage()
    donut.setData([
        {percent: usedPercentage, label: ' ', color: getPercentageColor(usedPercentage)},
    ]);
    setTimeout(() => rerenderComponent(donut), 1000)
}

module.exports = {initComponentRender}