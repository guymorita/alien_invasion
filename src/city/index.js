

export class City {
    constructor({city, neighbors}) {
        if (!city) throw Error ("Must have city name")
        this.city = city
        this.neighbors = new Neighbors(neighbors)
        this.currentAlien = ""
        this.active = true
    }
}

export class Neighbors {
    constructor({north, south, east, west}) {
        this.north = north || ''
        this.south = south || ''
        this.east = east || ''
        this.west = west || ''
        this.hasNeighbors = north || south || east || west
    }

    getNeighbors() {
        return {
            north: this.north,
            south: this.south,
            east: this.east,
            south: this.south
        }
    }
}

export const createCities = (world) => {
    const cities = {}
    for (let line of world) {
        const cityName = line['city']
        const city = new City({
            city: cityName,
            neighbors: line['neighbors']
        })
        cities[cityName] = city
    }
    return cities
}
