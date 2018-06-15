var currentAssignment = [true, false, false, true]
console.log(newArrayVariable(currentAssignment, currentAssignment.length - 1))



function newArrayVariable (currentAssignment, indice) {
    
    if(currentAssignment[indice] == false) {
        currentAssignment[indice] = true
        return currentAssignment
    } else {
        currentAssignment[indice] = false
        return newArrayVariable(currentAssignment, indice - 1)
    }
    }
