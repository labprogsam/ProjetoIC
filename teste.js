exports.solve = function(fileName) {
    let formula = propsat.readFormula(fileName)
    let result = doSolve(formula.clauses, formula.variables)
    return result // two fields: isSat and satisfyingAssignment
  }

//----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------  
  function newArrayVariable (currentAssignment, indice) {
    
    if(currentAssignment[indice] == 0) {
        currentAssignment[indice] = 1
        return currentAssignment
    } else {
        currentAssignment[indice] = 0
        return currentAssignment[indice --]
    }
    }
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
   function nextAssignment (currentAssignment) {
    
    var resultado = newArrayVariable(currentAssignment, currentAssignment.length -1)
    return resultado

   }
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

function doSolve(clauses, assignment) {
    let isSat = false

    
    while ((!isSat) && ) {
      // does this assignment satisfy the formula? If so, make isSat true. 
        for(i = 0; i < assignment.length; i++) {
            
        }

      // if not, get the next assignment and try again. 
      assignment = nextAssignment(assignment)
    }

    
    let result = {'isSat': isSat, satisfyingAssignment: null}
    if (isSat) {
      result.satisfyingAssignment = assignment
    }
    return result
  }

//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

    
   function readFormula(fileName) {
    let text = readFiles()
    let clauses = readClauses(text)
    let variables = readVariables(clauses)
    
    let specOk = checkProblemSpecification(text, clauses, variables)
  
    let result = { 'clauses': [], 'variables': [] }
    if (specOk) {
      result.clauses = clauses
      result.variables = variables
    }
    return result
  }
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

function readFiles () {
    var fs = require('fs');
    var leitura = fs.readFileSync('hole1.cnf').toString()
    var linhas = [];
    var linhas = leitura.split('\r\n');
    
return linhas
}
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
  function checkProblemSpecification (text,clauses,variables) {
    
    var arrayAux = []
    var verificador = false;

    //Esse laço irá pegar a quantidade de variáveis e cláusulas adquirida do .cnf,

    for(i = 0; i < text.length && verificador == false; i++ ) {
        arrayAux =  text[i].split(' ');

        for(j = 0; j < arrayAux.length && verificador == false; j++) {
            if(arrayAux[j] == "cnf") {
                
                verificador = true;
                var qntVariaveis = arrayAux[j+1]
                var qntClausulas = arrayAux[j+2]
            }
        }   
    }
    //Apos sair do laço eu verifico se realmente a quantidade de cláusulas e de variáveis
    //é igual a quantidade de cláusulas e variáveis informada.
    if(qntClausulas == clauses.length && qntVariaveis == variables.length) {
        
        return true

    } else  {
        return false
    }
}
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

function readClauses (text) {
    var achou = false
    var position = 0
    var contador = 0
    var arrayClauses = []
    var auxiliar = []
   
   //Nesse laço estou verificando qual linha esta o 'cnf', pois é a partir dele
   //que eu começarei a pegar as cláusulas.
    while (contador < text.length && achou == false) {
        arrayAux = text[contador].split(' ')
        
        for(i = 0; i < arrayAux.length && achou == false; i++) {
            if(arrayAux[i] == 'cnf' ) {
                 position = contador + 1 ;
                 achou = true
        } 
    }
        contador++
    }

    //Apos sair do laço eu terei a linha a qual está está o 'cnf', e pegarei
    //todos as linhas depois dessa.
    contador = 0
  
     for(i = 0; i < text.length - position; i++) { 
         arrayClauses[i] = text[position + i].split(' ')
  
        if(arrayClauses[i] != '') {
            for(j = 0; j < arrayClauses[i].length; j++) {
        
                if(arrayClauses[i][j] != 0 && arrayClauses[i][j] != '') {
                auxiliar[contador] = arrayClauses[i][j]
                contador++
                } 
                     else if(arrayClauses[i][j] == 0 && arrayClauses[i][j] != '') { 
                        contador = 0
                    }
                    }
                    if(contador == 0) {
                     arrayClauses[i] = auxiliar
                     auxiliar = []
        } 
    }
    
} 
    return arrayClauses
}
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

function readVariables (clauses) {
    var qntNum = 0
    var totalCriar = 0
    
    var arrayOrganizado = []
    var concatenacaoArrays = []
    
    //Aqui concatenarei todas as clausulas em um só array.
    for(i = 0; i < clauses.length; i++) {
        concatenacaoArrays = concatenacaoArrays.concat(clauses[i])
    }
    //Apos sair do laço, terei todos os elementos das clausulas em um só array,
    //a proxima linha irá organizar esse novo array em ordem crescente.
    arrayOrganizado = concatenacaoArrays.sort();

    //Apos organizado eu pego ultimo (Que é o maior) elemento do arrayOrganizado.
    qntNum = arrayOrganizado[arrayOrganizado.length -1]
    totalCriar = Math.abs(qntNum) 

    for(i = 0; i < totalCriar; i++) {
        arrayVariaveis[i] = false
    }
    return arrayVariaveis
    
}
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------




    
    
