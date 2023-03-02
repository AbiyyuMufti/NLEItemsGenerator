const NLEModifier = require('./lib/modifierNLE')
const ap = require('./lib/appender')
const sAp = require('./lib/outerAppender')
const gAp = require('./lib/globalAppender')

const inputFx = [
  ap.createStandardVTQOutput,
  ap.createStandardVTQModel,
  ap.createStandardVTQMapping
]

const inputFxSubThing = [
  ap.createStandardVTQOutput,
  ap.createVTQWithSubThingModel,
  ap.createStandardVTQMapping
]

const outerAlarmStatusFx = [
  sAp.createAlarmOutput,
  sAp.createStatusOutput,
  sAp.createAlarmModel,
  sAp.createStatusModel,
  sAp.createAlarmStatusMapping
]

const outerAssetAlarmStatusFx = [
  sAp.createAssetOutput,
  sAp.createAssetModel,
  sAp.createAssetMapping,
  sAp.createAlarmOutput,
  sAp.createStatusOutput,
  sAp.createAlarmModel,
  sAp.createStatusModel,
  sAp.createAlarmStatusMapping
]
const globalFx = [gAp.createModelReference]

const vtqWithAlarmAndStatus = new NLEModifier(inputFx, outerAlarmStatusFx, globalFx)

const vtqWithAlarmAndStatusUseSubThing = new NLEModifier(inputFxSubThing, outerAlarmStatusFx, globalFx)

const vtqStandard = new NLEModifier(inputFx, [], globalFx)

const vtqWithAssetAlarmAndStatus = new NLEModifier(inputFx, outerAssetAlarmStatusFx, globalFx)

const input2 = [ap.createArrayVTQOutput,
  ap.createVTQModelOnlyProperty,
  ap.createOutArrayMapping
]

const outer2 = [
  sAp.createAssetOutput,
  sAp.createAlarmOutput,
  sAp.createStatusOutput,
  sAp.createAssetModel,
  sAp.createAlarmModel,
  sAp.createStatusModel,
  sAp.createAssetAlarmStatusMapping
]

const vtqOnlyPropertiesAndArrayOut = new NLEModifier(input2, outer2, [])

const creator = {
  vtqWithAlarmAndStatus,
  vtqWithAssetAlarmAndStatus,
  vtqStandard,
  vtqOnlyPropertiesAndArrayOut,
  vtqWithAlarmAndStatusUseSubThing
}

module.exports = creator
