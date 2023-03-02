function createAssetOutput (output) {
  const alarmEntry = {
    address: '$.Asset',
    name: 'Asset',
    dataType: 'object',
    isArray: false,
    schema: [
      {
        address: '$.Asset[?].Name',
        name: 'Name',
        dataType: 'string',
        isArray: false,
        schema: []
      },
      {
        address: '$.Asset[?].timestamp',
        name: 'timestamp',
        dataType: 'number',
        isArray: false,
        schema: []
      }
    ]
  }

  output.schema[0].schema.unshift(alarmEntry)
}

function createAlarmOutput (output) {
  const alarmEntry = {
    address: '$.Alarm',
    name: 'Alarm',
    dataType: 'object',
    isArray: true,
    schema: [
      {
        address: '$.Alarm[?].a',
        name: 'a',
        dataType: 'number',
        isArray: false,
        schema: []
      },
      {
        address: '$.Alarm[?].code',
        name: 'code',
        dataType: 'string',
        isArray: false,
        schema: []
      },
      {
        address: '$.Alarm[?].t',
        name: 't',
        dataType: 'number',
        isArray: false,
        schema: []
      },
      {
        address: '$.Alarm[?].type',
        name: 'type',
        dataType: 'string',
        isArray: false,
        schema: []
      }
    ]
  }

  output.schema[0].schema.unshift(alarmEntry)
}

function createStatusOutput (output) {
  const statusEntry = {
    address: '$.Status',
    name: 'Status',
    dataType: 'object',
    isArray: true,
    schema: [
      {
        address: '$.Status[?].a',
        name: 'a',
        dataType: 'string',
        isArray: false,
        schema: []
      },
      {
        address: '$.Status[?].q',
        name: 'q',
        dataType: 'number',
        isArray: false,
        schema: []
      },
      {
        address: '$.Status[?].t',
        name: 't',
        dataType: 'number',
        isArray: false,
        schema: []
      },
      {
        address: '$.Status[?].v',
        name: 'v',
        dataType: 'number',
        isArray: false,
        schema: []
      }
    ]
  }

  output.schema[0].schema.unshift(statusEntry)
}

function createAssetModel (output) {
  output.properties.Asset = {
    isArray: false,
    dataType: null,
    refModel: {
      name: 'NT-Asset',
      group: 'Model'
    }
  }

  // output.thing_properties.true = {
  //   script: '',
  //   default: null,
  //   refSubThing: null,
  //   subThingParamValue: []
  // }
}

function createAlarmModel (output) {
  output.properties.Alarm = {
    isArray: true,
    dataType: null,
    refModel: {
      name: 'Alarm-Model',
      group: 'Model'
    }
  }

  // output.thing_properties.Alarm = {
  //   script: '',
  //   default: null,
  //   refSubThing: null,
  //   subThingParamValue: []
  // }
}

function createStatusModel (output) {
  output.properties.Status = {
    isArray: true,
    dataType: null,
    refModel: {
      name: 'VTQA-Number',
      group: 'Model'
    }
  }

  // output.thing_properties.Alarm = {
  //   script: '',
  //   default: null,
  //   refSubThing: null,
  //   subThingParamValue: []
  // }
}

function createAlarmStatusMapping (output) {
  const alarmAndStatusMapping = [{
    sink: '$.Alarm',
    source: '$.value.Alarm'
  },
  {
    sink: '$.Alarm[?].a',
    source: '$.value.Alarm[?].a'
  },
  {
    sink: '$.Alarm[?].code',
    source: '$.value.Alarm[?].code'
  },
  {
    sink: '$.Alarm[?].t',
    source: '$.value.Alarm[?].t'
  },
  {
    sink: '$.Alarm[?].type',
    source: '$.value.Alarm[?].type'
  },
  {
    sink: '$.Status',
    source: '$.value.Status'
  },
  {
    sink: '$.Status[?].a',
    source: '$.value.Status[?].a'
  },
  {
    sink: '$.Status[?].q',
    source: '$.value.Status[?].q'
  },
  {
    sink: '$.Status[?].t',
    source: '$.value.Status[?].t'
  },
  {
    sink: '$.Status[?].v',
    source: '$.value.Status[?].v'
  }]
  output.mappingItems.unshift(...alarmAndStatusMapping)
}

function createAssetMapping (output) {
  output.mappingItems.unshift({
    sink: '$.Asset.Name',
    source: '$.value.Asset.Name'
  },
  {
    sink: '$.Asset.timestamp',
    source: '$.value.Asset.timestamp'
  })
}

function createAssetAlarmStatusMapping (output) {
  const alarmAndStatusMapping = [
    {
      sink: '$',
      source: '$.value.Data'
    },
    {
      sink: '$[?].Asset.name',
      source: '$.value.Asset.Name'
    },
    {
      sink: '$[?].Asset.timestamp',
      source: '$.value.Asset.timestamp'
    },
    {
      sink: '$[?].Alarm',
      source: '$.value.Data[?].Alarm'
    },
    {
      sink: '$[?].Alarm[?].a',
      source: '$.value.Data[?].Alarm[?].a'
    },
    {
      sink: '$[?].Alarm[?].code',
      source: '$.value.Data[?].Alarm[?].code'
    },
    {
      sink: '$[?].Alarm[?].t',
      source: '$.value.Data[?].Alarm[?].t'
    },
    {
      sink: '$[?].Alarm[?].type',
      source: '$.value.Data[?].Alarm[?].type'
    },
    {
      sink: '$[?].Status',
      source: '$.value.Data[?].Status'
    },
    {
      sink: '$[?].Status[?].a',
      source: '$.value.Data[?].Status[?].a'
    },
    {
      sink: '$[?].Status[?].q',
      source: '$.value.Data[?].Status[?].q'
    },
    {
      sink: '$[?].Status[?].t',
      source: '$.value.Data[?].Status[?].t'
    },
    {
      sink: '$[?].Status[?].v',
      source: '$.value.Data[?].Status[?].v'
    }]
  output.mappingItems.unshift(...alarmAndStatusMapping)
}

const outerAppender = {
  createAlarmOutput,
  createStatusOutput,
  createAlarmModel,
  createStatusModel,
  createAlarmStatusMapping,
  createAssetOutput,
  createAssetModel,
  createAssetMapping,
  createAssetAlarmStatusMapping
}

module.exports = outerAppender
