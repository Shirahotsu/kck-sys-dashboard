const blessed = require('blessed')
const {getDiskUsage} = require("../services/disk.service");
let details
const initComponentRender = (grid) => {
    details = grid.set(1, 2, 1, 4, blessed.box, {
        label: 'HARD DRIVE DETAILS',
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
        }
    })
    rerenderComponent()
    return details
}

const rerenderComponent = async () => {
    const {totalGb, usedGb, freeGb} = await getDiskUsage()
    details.setContent(`
Disk space [GB]\n\n
Total:${totalGb}\n
Used:${usedGb}\n
Free:${freeGb}\n
    `)

    setTimeout(() => rerenderComponent(details), 10000)
}

const setVisibility = hidden => {
    if(!details) return
    details.hidden = hidden
}

module.exports = {initComponentRender, setVisibility}