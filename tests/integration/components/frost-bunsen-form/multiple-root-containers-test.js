import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe} from 'mocha'
import {integrationTestContext} from 'dummy/tests/helpers/template'

const props = {
  bunsenModel: {
    properties: {
      bar: {type: 'number'},
      baz: {type: 'boolean'},
      foo: {type: 'string'}
    },
    type: 'object'
  },
  bunsenView: {
    cellDefinitions: {
      one: {
        children: [
          {model: 'foo'},
          {model: 'bar'}
        ]
      }
    },
    cells: [
      {label: 'One', extends: 'one'},
      {model: 'two'}
    ],
    type: 'form',
    version: '2.0'
  }
}

function tests (ctx) {
  describe('multiple root cells', function () {
    it('renders as expected', function () {
      const $tabs = ctx.rootNode.find('.frost-tabs')

      expect(
        $tabs.length,
        'renders frost-tabs'
      )
        .to.equal(1)

      const $tabButtons = $tabs.find('.frost-button')

      expect(
        $tabButtons.length,
        'renders tab for each root cell'
      )
        .to.equal(2)

      expect(
        $tabButtons.first().find('.text').text(),
        'renders correct text for first tab'
      )
        .to.equal('One')

      expect(
        $tabButtons.last().find('.text').text(),
        'renders correct text for second tab'
      )
        .to.equal('Two')
    })
  })
}

describeComponent(...integrationTestContext('frost-bunsen-form'),
  function () {
    let ctx = {}

    beforeEach(function () {
      this.setProperties(props)
      this.render(hbs`{{frost-bunsen-form
        bunsenModel=bunsenModel
        bunsenView=bunsenView
      }}`)
      ctx.rootNode = this.$('> *')
    })

    tests(ctx)
  }
)
