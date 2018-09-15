import generateName from 'sillyName'

import { convertWorld } from './importWorld'

const NUMBER_OF_MOVES = 100
const WORLD_PATH = "./data/world"

class City {
    constructor({city, neighbors}) {
        this.city = city
        this.neighbors = neighbors
        this.currentAlien = ""
    }
}

const activeCities = {}

const createCities = (world) => {
    const cities = {}
    for (let c of world) {
        const cityName = c['city']
        const city = new City({
            city: cityName,
            neighbors: c['neighbors']
        })
        cities[cityName] = city
    }
    return cities
}

const deployAliens = (cities, num) => {
    const listCities = Object.keys(cities)
    if (num >= listCities.length) throw Error("Too many aliens, send fewer")

    while(num) {
        const randomIdx = Math.floor(Math.random() * listCities.length)
        const cityName = listCities[randomIdx]
        const city = cities[cityName]
        const cityHasAlien = city.currentAlien
        if (cityHasAlien) continue
        city.currentAlien = generateName()
        num--
    }
    return cities
}

const invade = (numberOfAliens) => {
    const world = convertWorld(WORLD_PATH)
    const cities = createCities(world)
    const taintedCities = deployAliens(cities, numberOfAliens)
    console.log(taintedCities)
    // runIterations
    // returnCities
}

const invadeCommand = () => {
    const args = process.argv
    const numOfAliens = args[1]
    return invade(numOfAliens)
}

module.exports = { invade, invadeCommand }
