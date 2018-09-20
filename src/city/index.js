

class City {
    constructor({city, neighbors}) {
        this.city = city
        this.neighbors = neighbors
        this.currentAlien = ""
        this.active = true
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
