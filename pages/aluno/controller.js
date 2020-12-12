const fs = require('fs')

function ordenaDados() {
    let arrayNome = []
    let dadosAlunoOrdenados = {}
    let dadosAlunos = JSON.parse(fs.readFileSync('./database/banco_dados.json'))
    Object.keys(dadosAlunos.aluno).forEach( key => {
        arrayNome.push(dadosAlunos.aluno[key].nome)
    })
    arrayNome.sort()
   
    
    arrayNome.map(item => {
        Object.keys(dadosAlunos.aluno).forEach( key  => {
            if ( item == dadosAlunos.aluno[key].nome ) {
                let dadosOrdenados = {...dadosAlunos.aluno[key]} 
                dadosAlunoOrdenados =  {...dadosAlunoOrdenados, [key]:dadosOrdenados }
            }
        })
    })
    return dadosAlunoOrdenados
}

function load() {
    let dadosAlunos = ordenaDados()
    let lista = ``
    let indexx = 0
    Object.keys(dadosAlunos).forEach( (key , index) => {
        Object.values(dadosAlunos[key]).forEach( valor => {
            
            if ( indexx == 0 ) {            
                lista = `<tr><th class="bg-info" scope="row">${index+1}</th>`
            }
            if (index == 0) {
                indexx ++
            }
            if ( indexx == index + 22 ) {       
                indexx += 1        
                lista += `</tr><th class="bg-info" scope="row">${index+1}</th>`
            }
            lista += `<td style="font-size: 13px" class="border border-info">${valor}</td>`
            if (indexx == index + 21 ) {
                indexx++
            }
        })
    })
    document.getElementById('itens-alunos').innerHTML = lista
}

function carregaDadosPesquisa() {
    let inputPesquisa = document.getElementById('input-pesquisa').value
    let dadosAlunos = ordenaDados()
    let lista = ``
    let indexx = 0
    let index = 1
    inputPesquisaReg = new RegExp(inputPesquisa, "i")
    let idPesquisa  = document.getElementById('seleciona-tipo-pesquisa').value

    if ( inputPesquisa.length >= 1 ) {
        Object.keys(dadosAlunos).forEach( (key) => {
            Object.values(dadosAlunos[key]).forEach( valor => {
                if ( inputPesquisaReg.test( dadosAlunos[key][idPesquisa] )) {

                    if ( indexx == 0 ) {  
                        lista = `<tr><th class="bg-info" scope="row">${index}</th>`
                    }
                    if ( indexx == 23 ) { 
                        index ++      
                        indexx = 0    
                        lista += `</tr><th class="bg-info" scope="row">${index}</th>`
                    }
                    if ( indexx != 23 ) {
                        lista += `<td style="font-size: 13px" class="border border-info">${valor}</td>`
                        indexx ++
                    }
                    if (indexx == 22 ) {
                        indexx ++
                    }

                } 
            })
        })
    }
    if (event.keyCode == 8 && inputPesquisa.length == 0 ) {
        Object.keys(dadosAlunos).forEach( (key , index) => {
            Object.values(dadosAlunos[key]).forEach( valor => {
                
                if ( indexx == 0 ) {            
                    lista = `<tr><th class="bg-info" scope="row">${index+1}</th>`
                }
                if (index == 0) {
                    indexx ++
                }
                if ( indexx == index + 22 ) {       
                    indexx += 1        
                    lista += `</tr><th class="bg-info" scope="row">${index+1}</th>`
                }
                lista += `<td style="font-size: 13px" class="border border-info">${valor}</td>`
                if (indexx == index + 21 ) {
                    indexx++
                }
            })
        })
    }
    document.getElementById('itens-alunos').innerHTML = lista
}
