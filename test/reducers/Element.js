import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import ElementReducer from '../../src/reducers/Element'

function getElement(id) {
  return { element: document.getElementById(id) }
}

describe('ElementReducer', function() {
  before(function() {
    this.jsdom = require('jsdom-global')()
    document.body.innerHTML = fs.readFileSync(path.join(__dirname, '../fixtures/index.html'))
  })

  after(function() {
    this.jsdom()
  })

  beforeEach(function() {
    const reducer = new ElementReducer()
    this.reduce = reducer.reduce.bind(reducer)
    this.getStack = reducer.getStack.bind(reducer)
  })

  describe('#getStack', function() {
    it('handles objects like SVGElementInstance', function() {
      const svgElementInstance = { correspondingElement: document.getElementById('path') }
      const result = this.getStack(svgElementInstance)
      expect(result.length).to.equal(6)
      expect(result[5]).to.equal(svgElementInstance.correspondingElement)
    })
  })

  describe('#reduce', function() {
    it('assigns link url\'s', function() {
      const result = this.reduce(getElement('link'))
      expect(result.href).to.equal('/foo')
    })

    it('assigns image url\'s', function() {
      const result = this.reduce(getElement('image'))
      expect(result.image).to.equal('foo.jpg')
    })

    it('assigns input values', function() {
      const result = this.reduce(getElement('input'))
      expect(result.value).to.equal('foo')
    })

    it('assigns textarea values', function() {
      const result = this.reduce(getElement('textarea'))
      expect(result.value).to.equal('foo')
    })

    it('assigns select values', function() {
      const result = this.reduce(getElement('select'))
      expect(result.value).to.equal('foo')
    })

    it('assigns custom select values', function() {
      const result = this.reduce(getElement('select-custom'))
      expect(result.value).to.equal('bar')
    })

    it('assigns data attribute values', function() {
      const result = this.reduce(getElement('section'))
      expect(result.section).to.equal('foo')
    })

    it('assigns data attribute values found on parent nodes', function() {
      const result = this.reduce(getElement('item'))
      expect(result.section).to.equal('foo')
    })

    it('favors deeper nested elements when merging data attribute values', function() {
      const result = this.reduce(getElement('nested-item'))
      expect(result.item).to.equal('bar')
    })

    it('does not assign voided link url\'s', function() {
      const el = getElement('link-void')
      const result = this.reduce(el)
      expect(result.href).to.not.exist
    })

    it('does not assign link url\'s containing only a hash', function() {
      const result = this.reduce(getElement('link-hash'))
      expect(result.href).to.not.exist
    })
  })
})
