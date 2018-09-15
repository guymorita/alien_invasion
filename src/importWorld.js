
const fs = require('fs');

const getNeighbors = (dir) => {
    const n = {}
    for (let i = 1; i < dir.length; i++) {
        const dirCityPair = dir[i].split("=")
        const [direction, city] = dirCityPair
        n[direction]= city
    }
    return n
}

const convertLine = (line) => {
    const l = line.split(" ")
    const city = l[0]
    let neighbors = {}
    if (l.length > 1) {
        neighbors = getNeighbors(l)
    }
    return {
        city,
        neighbors
    }
}

const convertWorld = (path) => {
    const lines = fs.readFileSync(path, 'utf-8')
    .split('\n')
    const world = []
    for (let line of lines) {
        const l = convertLine(line)
        world.push(l)
    }
    return world
}

module.exports = { convertWorld }