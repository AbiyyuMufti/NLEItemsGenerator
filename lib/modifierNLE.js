const e = require('./validator')
const loopDepth = require('./loopDepth')

class modifierNLE {
  constructor (inputLevelFunction = [], outLevelFunction = [], globalLevelFunction = []) {
    this.inputLevelFunction = [...inputLevelFunction]
    this.outLevelFunction = [...outLevelFunction]
    this.globalLevelFunction = [...globalLevelFunction]
  }

  execute (jsonData, parameters, options) {
    const { exceptions, delimiter } = options
    const self = this
    const inputName = parameters.inputName
    if (inputName === undefined) {
      throw new e.ValidationError('Please input inputName as an object element to the parameter')
    }

    const inputElement = e.extractInputElement(inputName, jsonData)
    const depth = loopDepth(inputName, inputElement)
    const startVal = depth.min - 1

    const reference = {
      schema: [],
      properties: {},
      thing_properties: {},
      mappingItems: []
    }

    function disectInputTree (inputTree, elemNameArray, counter = 1) {
      if (inputTree.type === 'input') {
        const nameArray = [...elemNameArray, inputTree.name]
        Object.assign(options, { start: startVal, level: counter + 1, delimiter: delimiter || '/', exceptions })
        self.inputLevelFunction.forEach(fx => {
          fx(nameArray, reference, options)
        })
      }

      if (inputTree.type === 'group') {
        inputTree.children.forEach(element => {
          disectInputTree(element, [...elemNameArray, inputTree.name], counter + 1)
        })
      }
    }

    inputElement.inputTree.forEach(elem => {
      disectInputTree(elem, [inputName])
    })

    self.outLevelFunction.forEach(fx => { fx(reference, options) })

    self.globalLevelFunction.forEach(fx => { fx(jsonData, options) })

    if (parameters.outputName) {
      const outputTree = e.extractOutputTree(parameters.outputName, jsonData)
      outputTree.schema = JSON.stringify(reference.schema)
      console.log('Successfully creating new schema in the output')
    }
    if (parameters.modelName) {
      const model = e.extractModelElement(parameters.modelName, jsonData)
      model.properties = reference.properties
      console.log('Successfully adding properties to the thing-model')
      try {
        const thing = e.extractThingElement(model)
        thing.properties = reference.thing_properties
      } catch (ValidationError) {
        console.log('cannot modifying thing inside the model')
      }
    }
    if ([parameters.cycleName, parameters.modelName, parameters.outputName].every(k => k !== undefined)) {
      const mapping = e.extractMappingElement(parameters.cycleName, jsonData)
      mapping.mapping = reference.mappingItems
      console.log('Successfully adding mapping to the cycle')
    }
  }

  execute2 (jsonData, parameters, options) {
    // const { exceptions, delimiter } = options
    // const self = this
    const inputName = parameters.inputName
    const inputElement = e.extractInputElement(inputName, jsonData)
    const sts1Tree = inputElement.inputTree[0]

    const newSchema = [{
      address: '$',
      name: 'Root',
      dataType: 'object',
      isArray: false,
      schema: []
    }]

    const data = JSON.parse(sts1Tree.schema)

    // create output

    data[0].schema[3].schema.forEach(el => {
      el.address = el.address.replace('.value', '')
      el.schema?.forEach(subEl => {
        subEl.address = subEl.address.replace('.value', '')
      })
      newSchema[0].schema.push(el)
      if (el.name.includes('Alarm')) {
        console.log(el)
      }
    })

    // create mapping
    // mappingItems.push(
    //   { sink: `$[?].${tag}.q`, source: `$.value.Data[?].${tag}.q` },
    //   { sink: `$[?].${tag}.t`, source: `$.value.Data[?].${tag}.t` },
    //   { sink: `$[?].${tag}.v`, source: `$.value.Data[?].${tag}.v` }
    // )
  }
}

module.exports = modifierNLE
