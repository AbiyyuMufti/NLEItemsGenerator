function loopDepth (inputName, inputElement) {
  const out = []
  function disectInputTree (inputTree, elemNameArray, counter = 1) {
    if (inputTree.type === 'input') {
      const ctr = counter + 1
      out.push(ctr)
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

  const max = Math.max(...out)
  const min = Math.min(...out)

  return { max, min }
}

module.exports = loopDepth
