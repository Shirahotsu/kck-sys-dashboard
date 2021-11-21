const getPercentageColor = percentage => {
    if (percentage >= 80) return [215, 0, 0]
    if (percentage < 80 && percentage >= 60) return [255, 175, 0]
    return [100, 200, 170]
}
module.exports = {getPercentageColor}