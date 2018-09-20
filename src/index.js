import { parseWorld } from './parse'
import { createCities } from './city'
import { deployAliens, beginAlienAttack } from './invasion'

const WORLD_PATH = "./data/world"


export const invade = (numberOfAliens) => {
    const world = parseWorld(WORLD_PATH)
    const cities = createCities(world)
    const citiesWithAliens = deployAliens(cities, numberOfAliens)
    const postApocalypseCities = beginAlienAttack(citiesWithAliens)
    printOutput(postApocalypseCities)
    return postApocalypseCities
}

export const invadeCli = () => {
    const args = process.argv
    const numOfAliens = args[args.length - 1]
    if (!numOfAliens || typeof numOfAliens !== 'number') throw Error("Invalid input")
    return invade(numOfAliens)
}

const printOutput = (cities) => {
    const output = []

    for (let cityName in cities) {
        const city = cities[cityName]
        if (!city.active) continue
        let str = city.city
        for (let dir in city.neighbors) {
            const destinationName = city.neighbors[dir]
            if (!cities[destinationName]) continue
            str += ` ${dir}=${destinationName}`
        }
        output.push(str)
    }
    console.log(output)
}
