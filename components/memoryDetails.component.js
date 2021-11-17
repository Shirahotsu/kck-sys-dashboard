const blessed = require('blessed')
const {getMemoryUsage} = require("../services/memory.service");
let details
const initComponentRender = (grid) => {
    details = grid.set(1, 2, 1, 4, blessed.box, {
        label: 'MEMORY DETAILS',
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
    const {totalMemMb, usedMemMb, freeMemMb} = await getMemoryUsage()
    details.setContent(`
Memory space [MB]\n\n
Total:${totalMemMb}\n
Used:${usedMemMb}\n
Free:${freeMemMb}\n
    `)

    setTimeout(() => rerenderComponent(details), 1000)
}

const setVisibility = hidden => {
    if(!details) return
    details.hidden = hidden
}

module.exports = {initComponentRender, setVisibility}