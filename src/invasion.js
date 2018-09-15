

const invade = (param1) => {
    return 5
}

const invadeCommand = () => {
    const args = process.argv
    const numOfAliens = args[1]
    return invade(numOfAliens)
}

module.exports = { invade, invadeCommand }
