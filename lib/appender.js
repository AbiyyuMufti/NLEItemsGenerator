function createStandardVTQOutput (nameArray, output, options) {
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')

  if (output.schema.length === 0) {
    output.schema = [{
      address: '$',
      name: 'Root',
      dataType: 'object',
      isArray: false,
      schema: []
    }]
  }

  if (exceptions?.includes(tag)) return

  const outputEntry = {
    address: `$.${tag}`,
    name: tag,
    dataType: 'object',
    isArray: false,
    schema: [
      {
        address: `$.${tag}.v`,
        name: 'v',
        dataType: 'string',
        isArray: false,
        schema: []
      },
      {
        address: `$.${tag}.t`,
        name: 't',
        dataType: 'number',
        isArray: false,
        schema: []
      },
      {
        address: `$.${tag}.q`,
        name: 'q',
        dataType: 'number',
        isArray: false,
        schema: []
      }
    ]
  }
  output.schema[0].schema.push(outputEntry)
}

function createStandardVTQModel (nameArray, output, options) {
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')
  const source = nameArray.toString().replaceAll(',', '.')

  if (exceptions?.includes(tag)) return

  output.properties[tag] = {
    isArray: false,
    dataType: null,
    refModel: {
      name: 'VTQ-String',
      group: 'Model'
    }
  }

  output.thing_properties[tag] = {
    script: `var getData = await getValue('Inputs.${source}');\noutput = { v: getData.value.toString(), t:  getData.timestamp, q: getData.quality === "GOOD" ? 1 : 0} ;\n`,
    default: null,
    refSubThing: null,
    subThingParamValue: []
  }
}

function createVTQWithSubThingModel (nameArray, output, options) {
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')
  const source = nameArray.toString().replaceAll(',', '.')

  if (exceptions?.includes(tag)) return

  output.properties[tag] = {
    isArray: false,
    dataType: null,
    refModel: {
      name: 'VTQ-String',
      group: 'Model'
    }
  }

  output.thing_properties[tag] = {
    script: '',
    default: null,
    refSubThing: {
      name: 'VTQString',
      group: 'Model',
      model: 'VTQ-String'
    },
    subThingParamValue: [
      {
        value: `Inputs.${source}`,
        source: 'INPUT',
        dataType: 'STRING',
        parameter: 'addressValue'
      }
    ]
  }
}

function createStandardVTQMapping (nameArray, output, options) {
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')

  if (exceptions?.includes(tag)) return

  output.mappingItems.push(
    { sink: `$.${tag}.q`, source: `$.value.${tag}.q` },
    { sink: `$.${tag}.t`, source: `$.value.${tag}.t` },
    { sink: `$.${tag}.v`, source: `$.value.${tag}.v` }
  )
}

function createVTQModelOnlyProperty (nameArray, output, options) {
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')

  if (exceptions?.includes(tag)) return

  output.properties[tag] = {
    isArray: false,
    dataType: null,
    refModel: {
      name: 'VTQ-String',
      group: 'Model'
    }
  }
}

function createArrayVTQOutput (nameArray, output, options) {
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')

  if (output.schema.length === 0) {
    output.schema = [{
      address: '$',
      name: 'Root',
      dataType: 'object',
      isArray: true,
      schema: []
    }]
  }

  if (exceptions?.includes(tag)) return

  const outputEntry = {
    address: `$.${tag}`,
    name: tag,
    dataType: 'object',
    isArray: false,
    schema: [
      {
        address: `$.${tag}.v`,
        name: 'v',
        dataType: 'string',
        isArray: false,
        schema: []
      },
      {
        address: `$.${tag}.t`,
        name: 't',
        dataType: 'number',
        isArray: false,
        schema: []
      },
      {
        address: `$.${tag}.q`,
        name: 'q',
        dataType: 'number',
        isArray: false,
        schema: []
      }
    ]
  }
  output.schema[0].schema.push(outputEntry)
}

function createOutArrayMapping (nameArray, output, options) {
  // TODO:  Mapping is like normal mapping, VTQ Mapping but with additional Data
  const { exceptions, start, level, delimiter } = options
  const val = nameArray.slice(start, level)
  const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')

  if (exceptions?.includes(tag)) return

  output.mappingItems.push(
    { sink: `$[?].${tag}.q`, source: `$.value.Data[?].${tag}.q` },
    { sink: `$[?].${tag}.t`, source: `$.value.Data[?].${tag}.t` },
    { sink: `$[?].${tag}.v`, source: `$.value.Data[?].${tag}.v` }
  )
}

const appender = {
  createStandardVTQOutput,
  createStandardVTQModel,
  createStandardVTQMapping,
  createVTQModelOnlyProperty,
  createArrayVTQOutput,
  createOutArrayMapping,
  createVTQWithSubThingModel
}

module.exports = appender
