import { expect } from 'chai'
import { City, Neighbors, createCities } from './index'


describe('City', () => {
    it('Throws an error if a city is created without a name', () => {
        try {
            const city = new City("")
         }
         catch (e) {
            expect(e.message).to.be.equal('Must have city name')
         }
    })

    it('Returns valid city class given a world', () => {
        const cityNameOne = 'Tokyo'
        const cityNameTwo = 'Komopolis'

        const world = [
            { city: cityNameOne, neighbors: { east: cityNameTwo, south: 'Miran' } }
        ]

        const cities = createCities(world)
        const city = cities[cityNameOne]

        expect(city.city).to.be.equal(cityNameOne)
        expect(city.neighbors.east).to.be.equal(cityNameTwo)
    })

    it('Returns a valid neighbor class given directions', () => {
        const cityName = 'New York'
        const neighborsInput = { east: cityName, south: 'Miran' }

        const neighbors = new Neighbors(neighborsInput)

        expect(neighbors.east).to.be.equal(cityName)
    })
})
