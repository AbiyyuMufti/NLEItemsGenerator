// ! Files to run the program

const path = require('path')
const fs = require('fs')

// Read the file as json
// const filename = 'STS1Blank.json'
// const data = fs.readFileSync(path.join('resources', filename))
// const allInputOutput = JSON.parse(data)
// const filename2 = 'wsReference.json'
// const data2 = fs.readFileSync(path.join('resources', filename2))
// const secondInputOutput = JSON.parse(data2)
const filename3 = 'inputTest.json'
const data3 = fs.readFileSync(path.join('resources', filename3))
const thirdInputOutput = JSON.parse(data3)
// const data4 = fs.readFileSync(path.join('resources', 'inputMQTT.json'))
// const fourthInputOutput = JSON.parse(data4)

// const parameters = {
//   inputName: 'STS1UA',
//   outputName: 'STS1ToWS',
//   modelName: 'STS1Thing',
//   cycleName: 'STS1Cycle'
// }

// const parameters2 = {
//   inputName: 'STS1-Kepware',
//   outputName: 'WSTransmitter',
//   modelName: 'STSData',
//   cycleName: 'WSToHub'
// }

const parameters3 = {
  inputName: 'STS1-Kepware',
  outputName: 'STS1-Transmitter',
  modelName: 'Data',
  cycleName: 'STS1ToWs'
}

// const parameters4 = {
//   inputName: 'WSReceiver'
//   // outputName: 'STS1-Transmitter',
//   // modelName: 'Data',
//   // cycleName: 'STS1ToWs'
// }

const create = require('./creator')

const finder = require('./lib/finder')
// const exceptions = finder('Fault', parameters.inputName, allInputOutput)
const exceptions3 = finder('Fault', parameters3.inputName, thirdInputOutput)

// create.vtqWithAssetAlarmAndStatus.execute(allInputOutput, parameters, { exceptions })

// create.vtqOnlyPropertiesAndArrayOut.execute(secondInputOutput, parameters2, { exceptions })

create.vtqWithAssetAlarmAndStatus.execute(thirdInputOutput, parameters3, { exceptions: exceptions3 })

function writeToDocument (outFile, jsonToWrite) {
  // Write the edited file
  fs.writeFile(outFile, JSON.stringify(jsonToWrite), (err, res) => {
    if (err) {
      const message = `Writing file failed !\n ${err.message}`
      console.log(message)
    } else {
      console.log(`Succesfully write file: ${outFile}`)
    }
  })
}

// const NLEModifier = require('./lib/modifierNLE')
// const e2 = new NLEModifier([], [], [])
// e2.execute2(fourthInputOutput, parameters4, {})

// const outFile = path.join('result', filename.replaceAll('.json', '') + 'Out.json')
// writeToDocument(outFile, allInputOutput)
// const outFile2 = path.join('result', 'wsReference.json'.replaceAll('.json', '') + '-WS.json')
// writeToDocument(outFile2, secondInputOutput)
const outFile3 = path.join('result', filename3.replaceAll('.json', '') + '-O2.json')
writeToDocument(outFile3, thirdInputOutput)

// TODO 1: Create Immediate Binding from input to output
// TODO 2: Performance Test
