const blessed = require("blessed");
const contrib = require('blessed-contrib')

const {getIp, getHostname, getUptime, getArch, getOperatingSystem} = require("../services/operatingSystem.service");
const {getIsInternetConnected} = require('../services/network.service')

const content = `
System: ...\n
IP: ...\n
Hostname: ...\n
Uptime: ...\n
Arch: ...\n
Connected: ...
        `

const initComponentRender = grid => {
    const infoBox = grid.set(1, 0, 1, 2, blessed.box, {
        label: 'INFO',
        content: content,
        padding: {
            left: 1,
            right: 1
        },
        style: {
            fg: 'white',
            border: {
                fg: '#f0f0f0'
            },
        }
    })
    initReloadingBasicInfoData(infoBox)
}

const initReloadingBasicInfoData = async infoBox => {
    getOperatingSystem().then(res => {
        setInterval(() => reloadBasicInfoData(infoBox, res), 1000)
    })
}


let isConnected = false

async function reloadBasicInfoData(infoBox, operatingSystem) {
    // TODO uncomment on review
    // isConnected = await getIsInternetConnected()
    const ip = getIp()
    const hostname = getHostname()
    const uptime = getUptime()
    const arch = getArch()
    const content = `
System: ${operatingSystem}\n
IP: ${ip}\n
Hostname: ${hostname}\n
Uptime: ${uptime}\n
Arch: ${arch}\n
Connected: ${isConnected}
        `

    infoBox.setContent(content)
}

module.exports = {initComponentRender}