
const fs = require('fs');

const lines = fs.readFileSync("./data/world", 'utf-8')
    .split('\n')

const getNeighbors = (dir) => {
    const n = {}
    for (let i = 1; i < dir.length; i++) {
        const dirCityPair = dir[i].split("=")
        const [direction, cityName] = dirCityPair
        n[direction]= cityName
    }
    return n
}

const convertLine = (line) => {
    const dir = line.split(" ")
    const cityName = dir[0]
    let neighbors = {}
    if (dir.length > 1) {
        neighbors = getNeighbors(dir)
    }
    return {
        cityName,
        neighbors
    }
}

export const convertWorld = (l) => {
    const world = []
    for (let line of l) {
        const li = convertLine(line)
        world.push(li)
    }
    return world
}

