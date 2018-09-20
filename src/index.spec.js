import { expect } from 'chai'
import { invade } from './index'

describe('Invasion', () => {
    it('Throws an error if too many Aliens', () => {
        try {
            const cities = invade(100000)
         }
         catch (e) {
            expect(e.message).to.be.equal('Too many aliens, send fewer')
         }
    })

    it('Returns a hashset of cities post apocalypse', () => {
        const cities = invade(2)
        expect(cities).to.be.an('object')
    })

    it('Atlantis cannot be destroyed', () => {
        const cities = invade(8)
        expect(cities).to.have.property('Atlantis')
    })
})
