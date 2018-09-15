import generateName from 'sillyName'

import { convertWorld } from './importWorld'

const NUMBER_OF_MOVES = 10000
const WORLD_PATH = "./data/world"

class City {
    constructor({city, neighbors}) {
        this.city = city
        this.neighbors = neighbors
        this.currentAlien = ""
    }
}

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

const rampageWorld = (cities) => {
    let movesLeft = NUMBER_OF_MOVES

    while(movesLeft) {
        movesLeft--

        const listCities = Object.keys(cities)
        const randomIdx = Math.floor(Math.random() * listCities.length)
        const cityName = listCities[randomIdx]
        const city = cities[cityName]
        if (!city.currentAlien) continue

        const destinationName = getDestinationCity(cities, city)
        if (!destinationName) continue

        cities = alienMove(cities, city, destinationName)
    }
    return cities
}

const getDestinationCity = (cities, city) => {
    const possibleCities = []
    if (!city.neighbors) return null

    for (let n in city.neighbors) {
        const cityName = city.neighbors[n]
        if (cities[cityName]) possibleCities.push(cityName)
    }
    const randomIdx = Math.floor(Math.random() * possibleCities.length)
    return possibleCities[randomIdx]
}

const alienMove = (cities, city, destinationName) => {
    const destinationCity = cities[destinationName]
    const cityName = city.city
    if (destinationCity.currentAlien) {
        console.log(`${destinationName} was destroyed by ${city.currentAlien} and ${destinationCity.currentAlien}`)
        delete cities[destinationName]
        cities[cityName].currentAlien = ""
    } else {
        cities[destinationName].currentAlien = cities[cityName].currentAlien
        cities[cityName].currentAlien = ""
    }
    return cities
}

const printOutput = (cities) => {
    const output = []

    for (let cityName in cities) {
        const city = cities[cityName]
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

export const invade = (numberOfAliens) => {
    const world = convertWorld(WORLD_PATH)
    const cities = createCities(world)
    const taintedCities = deployAliens(cities, numberOfAliens)
    const postApocalypseCities = rampageWorld(taintedCities)
    printOutput(postApocalypseCities)
    return postApocalypseCities
}

export const invadeCommand = () => {
    const args = process.argv
    const numOfAliens = args[args.length - 1]
    return invade(numOfAliens)
}
