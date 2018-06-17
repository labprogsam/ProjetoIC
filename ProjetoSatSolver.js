var re = teste("hole1.cnf")
console.log(re.isSat);
console.log(re.satisfyingAssignment);

/*exports.solve = */function teste(fileName) {
    let formula = /*propsat.*/readFormula(fileName)
    let result = doSolve(formula.clauses, formula.variables)
    
    return result 
  }
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
function newArrayVariable (currentAssignment, indice) {
    
    if(currentAssignment[indice] == false) {
        currentAssignment[indice] = true
        
        return currentAssignment
    
    } else {
        currentAssignment[indice] = false
       
        return newArrayVariable(currentAssignment, indice - 1)
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
    var end = false
    var clausesOk = 0
    var inClause = false
    

    while ((!isSat) && !end ) {
        end = true
       
    for(j = 0; j < clauses.length; j++) {
         
        //Pegarei a minha clausula j dentro todas as existentes e ve se ela é satisfeita:
         var currentClauses = clauses[j]
         inClause = true 
         
            for(i = 0; i < currentClauses.length && inClause; i ++) {
                //Pegarei a minha variável i da clausula j escolhida a cima:
                var currentVariable = currentClauses[i]
            
            //Se a variavel entrar nesse if é pq ele é false:
            if(currentVariable < 0 ) {  
                 currentVariable = Math.abs(currentVariable) - 1  //<--Pego o local onda ela está
               
                 if(assignment[currentVariable] == false) {
                    //Apos entrar no if sei q a clausula foi satisfeita e testo a próxima.
                    inClause = false   
                    //O clausulaOk serve para saber quantas clausulas foram satisfeita no final.        
                    clausesOk += 1
                    } 
              } 
               //Se entrou no else quer dizer que ele é positivo;
               else  {  
               currentVariable -= 1         
                   
                  if(assignment[currentVariable] == true) { 
                    //Análoga a citada a cima.
                    inClause = false
                    clausesOk += 1
                  }
                }
             }
    }   
        //Verifica se é satisfatível.
        if(clausesOk == clauses.length) {
            isSat = true
        }
        

      //verifica se é a ultima solução possível:
      for(i = 0; i < assignment.length && end; i ++) {
            if(assignment[i] == false) {
                end = false
            }
        }

      //Verifica se eu já encontrei a solução ou se eu já estou na ultima solução.
      if(end == false && !isSat) {       
          assignment = nextAssignment(assignment)
      }
      //Reseto as clausesOk pois testarei o proximo assignment caso necessário.
      clausesOk = 0
      inClause = false

    } //Fim do while

    let result = {'isSat': isSat, satisfyingAssignment: null}
    if (isSat) {
      result.satisfyingAssignment = assignment
    }
    return result
  }
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
   function readFormula(fileName) {
    
    let text = readText(fileName)
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
function readText (fileName) {
    var fs = require('fs');
    var leitura = fs.readFileSync(fileName).toString()
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
    //é igual a quantidade de cláusulas e variáveis colocadas.
    
    if(qntClausulas == clauses.length && qntVariaveis == variables.length) {
        return true
    } else {
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
   
   /*Nesse laço estou verificando qual linha esta o 'cnf', pois é a partir dele
   que eu começarei a pegar as cláusulas.*/
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
    contador = 0
    
    //Apos sair do laço eu terei a linha a qual está está o 'cnf', e pegarei
    //todos as linhas depois dessa.
  

  /* No proximo for eu irei pegar somente as minhas clausulas e armazenar em "ArrayClauses"*/
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

    var totalCriar = 0
    var arrayVariaveis = []
    var arrayOrganizado = []
    var concatenacaoArrays = []
    
    //Aqui concatenarei todas as clausulas em um só array.

    for(i = 0; i < clauses.length; i++) {
        concatenacaoArrays = concatenacaoArrays.concat(clauses[i])
    }
    
    //Apos sair do laço, terei todos os elementos das clausulas em um só array,
    //a proxima linha irá organizar esse novo array em ordem crescente.
   
    for(i = 0; i < concatenacaoArrays.length; i ++) {
        arrayOrganizado[i] = parseInt((concatenacaoArrays[i]))
        arrayOrganizado[i] = Math.abs(arrayOrganizado[i])
    }

    //BubbleSorte para organizar o meu arrayOrganizado
    for (var i = 0; i < arrayOrganizado.length; i++) { 
        for (var j = 0; j < arrayOrganizado.length - i - 1 ; j++) { 
          
          if(arrayOrganizado[j] > arrayOrganizado[j+1]) {
            
            var tmp = arrayOrganizado[j];  
            arrayOrganizado[j] = arrayOrganizado[j+1]; 
            arrayOrganizado[j+1] = tmp; 
          }
        }        
      }

    //Apos organizado eu pego ultimo (Que é o maior) elemento do arrayOrganizado.
    totalCriar = arrayOrganizado[arrayOrganizado.length - 1]
    
    for(i = 0; i < totalCriar; i++) {
        arrayVariaveis[i] = false
    }
    return arrayVariaveis
}
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------