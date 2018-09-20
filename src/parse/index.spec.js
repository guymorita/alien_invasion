import { expect } from 'chai'
import { parseWorld } from './index'
import { path } from '../config'

describe('Parse', () => {
    it('Correctly parses the world file', () => {
        const world = parseWorld(path)

        const firstCity = { city: 'Garagos', neighbors: { east: 'Komopolis', south: 'Miran' } }

        expect (world[0]['city']).to.be.equal(firstCity['city'])
    })

})
