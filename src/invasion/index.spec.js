import { expect } from 'chai'
import { City } from '../city'
import { deployAliens, beginAlienAttack } from './index'


describe('Invasion', () => {
    let cities

    beforeEach(() => {
        const cityOne = new City({ city: 'Garagos', neighbors: { east: 'Komopolis', south: 'Miran' } })
        const cityTwo = new City({ city: 'Komopolis', neighbors: { west: 'Garagos', south: 'Zenodotion' } })
        const cityThree = new City({ city: 'Miran', neighbors: { north: 'Garagos', east: 'Zenodotion', south: 'Zhuxian' } })
        cities = {
            Garagos: cityOne,
            Komopolis: cityTwo,
            Miran: cityThree
        }
    })

    it('Throws an error if too man aliens are sent', () => {
        try {
            cities = deployAliens(cities, 1000)
        } catch (e) {
            expect(e.message).to.be.equal('Too many aliens, send fewer')
        }
    })

    it('Cities should have aliens after they are deployed', () => {
        cities = deployAliens(cities, 1)

        let hasAliens = false
        for (let cityName in cities) {
            const city = cities[cityName]
            if (city.currentAlien) hasAliens = true
        }

        expect(hasAliens).to.be.true
    })

    it('Should destroy one of the cities if two aliens spend time in the world together', () => {
        cities = deployAliens(cities, 2)

        cities = beginAlienAttack(cities)

        let hasInactiveCity = false

        for (let cityName in cities) {
            const city = cities[cityName]
            if (!city.active) hasInactiveCity = true
        }

        expect(hasInactiveCity).to.be.true
    })
})
