import { convertWorld } from './importWorld'

const NUMBER_OF_ALIENS = 3
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

const deployAliens = (num) => {

}

const invade = () => {
    const world = convertWorld(WORLD_PATH)
    const cities = createCities(world)
    console.log(cities)
    // deployAliens
    // runIterations
    // returnCities
}

const invadeCommand = () => {
    const args = process.argv
    const numOfAliens = args[1]
    return invade(numOfAliens)
}

module.exports = { invade, invadeCommand }
