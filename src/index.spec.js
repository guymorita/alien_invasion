import { expect } from 'chai'
import { invadeCli } from './index'

describe('Entry Point', () => {
    it('Throws an error if called without numberOfAliens', () => {
        try {
            invadeCli()
        } catch (e) {
            expect(e.message).to.be.equal('Invalid input, send aliens')
        }
    })

})
