function createModelReference (output) {
  const referenceModel = [
    {
      group: {
        name: 'Model',
        description: null
      },
      name: 'VTQ-String',
      description: null,
      pollIntervalMs: 1000,
      properties: {
        q: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        t: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        v: {
          isArray: false,
          dataType: 'string',
          refModel: null
        }
      },
      things: [],
      subThings: [
        {
          name: 'VTQString',
          params: {
            addressValue: 'string'
          },
          properties: {
            q: {
              script: 'var thing = await getValue(addressValue)\r\noutput = thing.quality === "GOOD" ? 1 : 0\r\n',
              default: null,
              refSubThing: null,
              subThingParamValue: []
            },
            t: {
              script: 'var thing = await getValue(addressValue)\r\noutput = thing.timestamp\r\n',
              default: null,
              refSubThing: null,
              subThingParamValue: []
            },
            v: {
              script: 'var thing = await getValue(addressValue)\r\noutput = thing.value.toString()',
              default: null,
              refSubThing: null,
              subThingParamValue: []
            }
          },
          description: null
        }
      ]
    },
    {
      group: {
        name: 'Model',
        description: null
      },
      name: 'VTQA-Number',
      description: null,
      pollIntervalMs: 1000,
      properties: {
        a: {
          isArray: false,
          dataType: 'string',
          refModel: null
        },
        q: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        t: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        v: {
          isArray: false,
          dataType: 'number',
          refModel: null
        }
      },
      things: [],
      subThings: []
    },
    {
      group: {
        name: 'Model',
        description: null
      },
      name: 'VTQA-String',
      description: null,
      pollIntervalMs: 1000,
      properties: {
        a: {
          isArray: false,
          dataType: 'string',
          refModel: null
        },
        q: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        t: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        v: {
          isArray: false,
          dataType: 'string',
          refModel: null
        }
      },
      things: [],
      subThings: []
    },
    {
      group: {
        name: 'Model',
        description: null
      },
      name: 'VTA-Number',
      description: null,
      pollIntervalMs: 1000,
      properties: {
        q: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        t: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        v: {
          isArray: false,
          dataType: 'number',
          refModel: null
        }
      },
      things: [],
      subThings: [
        {
          name: 'VTANumber',
          params: {
            addressValue: 'string'
          },
          properties: {
            q: {
              script: 'var thing = await getValue(addressValue)\noutput = thing.quality === "GOOD" ? 1 : 0',
              default: null,
              refSubThing: null,
              subThingParamValue: []
            },
            t: {
              script: 'var thing = await getValue(addressValue)\noutput = thing.timestamp',
              default: null,
              refSubThing: null,
              subThingParamValue: []
            },
            v: {
              script: 'var thing = await getValue(addressValue)\noutput = thing.value',
              default: null,
              refSubThing: null,
              subThingParamValue: []
            }
          },
          description: null
        }
      ]
    },
    {
      group: {
        name: 'Model',
        description: null
      },
      name: 'Alarm-Model',
      description: null,
      pollIntervalMs: 1000,
      properties: {
        a: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        code: {
          isArray: false,
          dataType: 'string',
          refModel: null
        },
        t: {
          isArray: false,
          dataType: 'number',
          refModel: null
        },
        type: {
          isArray: false,
          dataType: 'string',
          refModel: null
        }
      },
      things: [],
      subThings: []
    },
    {
      group: {
        name: 'Model',
        description: null
      },
      name: 'NT-Asset',
      description: null,
      pollIntervalMs: 1000,
      properties: {
        Name: {
          isArray: false,
          dataType: 'string',
          refModel: null
        },
        timestamp: {
          isArray: false,
          dataType: 'number',
          refModel: null
        }
      },
      things: [],
      subThings: []
    }
  ]
  output['thing-models'].unshift(...referenceModel)
}

function createModelUsingOnlyProperties (output, options) {
  const { modelReference, groupReference } = options
  const data = {
    group: {
      name: groupReference,
      description: null
    },
    name: 'Data',
    description: null,
    pollIntervalMs: 1000,
    properties: {
      Data: {
        isArray: true,
        dataType: null,
        refModel: {
          name: modelReference,
          group: groupReference
        }
      }
    },
    things: [],
    subThings: []
  }
  output['thing-models'].push(data)
}

const globalAppender = {
  createModelReference,
  createModelUsingOnlyProperties
}

module.exports = globalAppender
