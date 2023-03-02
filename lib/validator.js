class ValidationError extends Error {
  constructor (message) {
    super(message) // (1)
    this.name = 'ValidationError' // (2)
  }
}

function extractInputElement (inputName, jsonData) {
  const inputElement = jsonData['input-output'].find(element => element.name === inputName)

  if (!inputElement) {
    const msg = `No input-output named: ${inputName}`
    throw new ValidationError(msg)
  }
  // if (inputElement.connectionType !== 'opcua') {
  //   throw new ValidationError('Input-output connection type has to be OPC UA to be used as input reference.')
  // }
  return inputElement
}

function extractOutputTree (outputName, jsonData) {
  const outputElement = jsonData['input-output'].find(element => element.name === outputName)
  if (!outputElement) {
    const msg = `No input-outputName named: ${outputName}`
    throw new ValidationError(msg)
  }
  if (outputElement.connectionType !== 'mqtt') {
    throw new ValidationError('Input-output connection type has to be MQTT to generate new the MQTT output')
  }
  if (outputElement.outputTree.length !== 1) {
    throw new ValidationError('Output tree must be an array with only one element.')
  }
  return outputElement.outputTree[0]
}

function extractModelElement (modelName, jsonData) {
  const thingModel = jsonData['thing-models'].find(element => element.group.name === modelName)

  if (!thingModel) {
    const msg = `No thing-model group named: ${modelName}`
    throw new ValidationError(msg)
  }
  // if (jsonData['thing-models'].length !== 1) {
  //   throw new ValidationError('Model must be an array with only one element.')
  // }
  return thingModel
}

function extractThingElement (model) {
  if (model.things.length !== 1) {
    throw new ValidationError('Thing inside the Model must be an array with only one element.')
  }
  return model.things[0]
}

function extractMappingElement (cycleName, jsonData) {
  const cycleElement = jsonData.cycles.find(element => element.name === cycleName)
  if (!cycleElement) {
    const msg = `No cycle element named: ${cycleName}`
    throw new ValidationError(msg)
  }

  const mapping = cycleElement.mappings[0]
  // const mapping = cycleElement.mappings.find(element => (element.input.groukp === modelName) && (element.output.connection === outputName))
  // if (!mapping) {
  //   const msg = `No cycle element with the input of ${modelName} and output of ${outputName}`
  //   throw new ValidationError(msg)
  // }

  return mapping
}

const validator = {
  extractInputElement,
  extractModelElement,
  extractOutputTree,
  extractThingElement,
  extractMappingElement
}

module.exports = validator
