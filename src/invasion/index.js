import generateName from 'sillyName'

const NUMBER_OF_MOVES = 10000


export const deployAliens = (cities, numberOfAliens) => {
    const listCities = Object.keys(cities)
    if (numberOfAliens >= listCities.length) throw Error("Too many aliens, send fewer")

    let numberOfAliensLeft = numberOfAliens
    while(numberOfAliensLeft) {
        // Assumption: Aliens are deployed on a random unoccupied city
        const randomIndex = randomNumber(listCities.length)
        const cityName = listCities[randomIndex]
        const city = cities[cityName]
        const cityHasAlien = !!city.currentAlien
        if (cityHasAlien) continue
        city.currentAlien = generateName()
        numberOfAliensLeft--
    }
    return cities
}

export const beginAlienAttack = (cities) => {
    const listCities = Object.keys(cities)
    let movesLeft = NUMBER_OF_MOVES

    // Assumption: Moves are based on randomly choosing a city and checking if
    // the city is active and if there is an alien present.
    while(movesLeft) {
        movesLeft--

        const randomIndex = randomNumber(listCities.length)
        const cityName = listCities[randomIndex]
        const startingCity = cities[cityName]
        if (!startingCity.currentAlien) continue
        if (!startingCity.active) continue

        const destinationName = getDestinationCity(cities, startingCity)
        if (!destinationName) continue

        cities = moveAlien({cities, startingCity, destinationName})
    }
    return cities
}

const randomNumber = (number) => {
    return Math.floor(Math.random() * number)
}

const getDestinationCity = (cities, city) => {
    const possibleCities = []
    if (!city.neighbors.hasNeighbors) return null

    for (let direction in city.neighbors.getNeighbors()) {
        const cityName = city.neighbors[direction]
        if (cities[cityName] && cities[cityName].active) possibleCities.push(cityName)
    }

    const randomIndex = randomNumber(possibleCities.length)
    return possibleCities[randomIndex]
}

const moveAlien = ({cities, startingCity, destinationName}) => {
    const destinationCity = cities[destinationName]
    const cityName = startingCity.city
    if (destinationCity.currentAlien) {
        console.log(`${destinationName} was destroyed by ${startingCity.currentAlien} and ${destinationCity.currentAlien}`)
        cities[destinationName].active = false
    } else {
        cities[destinationName].currentAlien = cities[cityName].currentAlien
    }
    cities[cityName].currentAlien = ""
    return cities
}

