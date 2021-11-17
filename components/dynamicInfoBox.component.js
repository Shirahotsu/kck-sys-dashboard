const blessed = require("blessed");
let defaultBox;
const initComponentRender = (grid) => {
    defaultBox = grid.set(1,2,1,4, blessed.box, {
        content: `Click on upper boxes \nto show more details`,
        tags: true,
        paddingTop:2,
        hidden: false,
        padding:{
            left:2,
            right:2
        },
        align:'center',
        style: {
            fg: 'white',
            border: {
                fg: '#f0f0f0'
            },
        }
    })
}

const setVisibility = hidden => {
    if(!defaultBox) return
    defaultBox.hidden = hidden
}

module.exports = {initComponentRender, setVisibility}