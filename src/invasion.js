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
    console.log('world', world)
}

const deployAliens = (num) => {

}

const invade = () => {
    const world = convertWorld(WORLD_PATH)
    const cities = createCities(world)
    // createCities
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
