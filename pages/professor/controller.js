const fs = require('fs')

function load() {
    let dadosProfessor = JSON.parse(fs.readFileSync('./database/banco_dados.json'))
    let lista = ``
    let indexx = 0
    Object.keys(dadosProfessor.professor).forEach( (key , index) => {
        Object.values(dadosProfessor.professor[key]).forEach( valor => {
            
            if ( indexx == 0 ) {            
                lista = `<tr><th scope="row">${index+1}</th>`
            }
            if (index == 0) {
                indexx ++
            }
            if ( indexx == index + 22 ) {       
                indexx += 1        
                lista += `</tr><th scope="row">${index+1}</th>`
            }
            lista += `<td>${valor}</td>`
            if (indexx == index + 21 ) {
                indexx++
            }
        })
    })
    document.getElementById('itens-professor').innerHTML = lista
}