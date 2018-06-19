var re = require("./node_modules/ProjetoSatSolver.js")
var resultado = re.solve('hole5.cnf')
console.log(resultado.isSat);
console.log(resultado.satisfyingAssignment);