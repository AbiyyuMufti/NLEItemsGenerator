const e = require('./validator')
const loopDepth = require('./loopDepth')

function finder (refNames, inputName, jsonData, options) {
  const { delimiter } = options || { delimiter: '/' }
  refNames = Array.isArray(refNames) ? refNames : [refNames]
  const inputElement = e.extractInputElement(inputName, jsonData)
  const out = []

  const depth = loopDepth(inputName, inputElement)
  const startVal = depth.min - 1

  function disectInputTree (inputTree, elemNameArray, counter = 1) {
    if (inputTree.type === 'input') {
      const nameArray = [...elemNameArray, inputTree.name]
      const val = nameArray.slice(startVal, counter + 1)
      const tag = val.toString().replaceAll(',', delimiter).replaceAll(' ', '_')
      refNames.forEach(name => {
        if (nameArray.includes(name)) {
          out.push(tag)
        }
      })
    }

    if (inputTree.type === 'group') {
      inputTree.children.forEach(element => {
        disectInputTree(element, [...elemNameArray, inputTree.name], counter + 1)
      })
    }
  }

  inputElement.inputTree.forEach(element => {
    disectInputTree(element, [inputName])
  })

  return out
}

module.exports = finder
