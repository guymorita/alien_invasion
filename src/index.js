import { parseWorld } from './parse'
import { createCities } from './city'
import { deployAliens, beginAlienAttack } from './invasion'
import { path } from './config'


export const invade = (numberOfAliens) => {
    const world = parseWorld(path)
    const cities = createCities(world)
    const citiesWithAliens = deployAliens(cities, numberOfAliens)
    const postApocalypseCities = beginAlienAttack(citiesWithAliens)
    printOutput(postApocalypseCities)
    return postApocalypseCities
}

export const invadeCli = () => {
    const args = process.argv
    const aliens = args[args.length - 1]
    const numOfAliens = Number(aliens)
    if (!numOfAliens) throw Error("Invalid input, send aliens")
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
