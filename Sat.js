
//----------------------checkProblemSpecification--------------------------------
var fs = require('fs');
var leitura = fs.readFileSync('PieceOfHoly6.cnf').toString()
var text = leitura.split('\r\n');


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
    for(j = 0; j < arrayClauses[i].length; j++) {
        if(arrayClauses[i][j] != 0 && arrayClauses[i][j] != '') {
            auxiliar[contador] = arrayClauses[i][j]
            contador++
        } else if(arrayClauses[i][j] == 0 && arrayClauses[i][j] != '')
        { 
            contador = 0
        }
    }
    if(contador == 0) {
        arrayClauses[i] = auxiliar
        auxiliar = []
   }
}
console.log(arrayClauses)
   



