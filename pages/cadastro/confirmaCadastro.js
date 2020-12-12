const fs = require('fs')
const watch = require('node-watch')


watch('./database/banco_dados.json', { recursive: true }, function(evt, name) {
    let dadosBanco = JSON.parse(fs.readFileSync('./database/banco_dados.json'))
    if ( evt && dadosBanco.idAlunoTemp != "" ) {
        let key = dadosBanco.idAlunoTemp
        if ( dadosBanco.tipoCadastro == "aluno" ) {
            document.getElementById('td-1').innerHTML = dadosBanco.alunoTemp[key].nome
            document.getElementById('td-2').innerHTML = dadosBanco.alunoTemp[key].cpf
            document.getElementById('td-3').innerHTML = dadosBanco.alunoTemp[key].sexo
            document.getElementById('td-4').innerHTML = dadosBanco.alunoTemp[key].nascimento
            document.getElementById('td-5').innerHTML = dadosBanco.alunoTemp[key].pai
            document.getElementById('td-6').innerHTML = dadosBanco.alunoTemp[key].mae
            document.getElementById('td-7').innerHTML = dadosBanco.alunoTemp[key].endereco
            document.getElementById('td-8').innerHTML = dadosBanco.alunoTemp[key].numeroEndereco
            document.getElementById('td-9').innerHTML = dadosBanco.alunoTemp[key].complemento
            document.getElementById('td-10').innerHTML = dadosBanco.alunoTemp[key].bairro
            document.getElementById('td-11').innerHTML = dadosBanco.alunoTemp[key].cidade
            document.getElementById('td-12').innerHTML = dadosBanco.alunoTemp[key].cep
            document.getElementById('td-13').innerHTML = dadosBanco.alunoTemp[key].estado
            document.getElementById('td-14').innerHTML = dadosBanco.alunoTemp[key].identidade
            document.getElementById('td-15').innerHTML = dadosBanco.alunoTemp[key].orgaoExpedidor
            document.getElementById('td-16').innerHTML = dadosBanco.alunoTemp[key].profissao
            document.getElementById('td-17').innerHTML = dadosBanco.alunoTemp[key].estadoCivil
            document.getElementById('td-18').innerHTML = dadosBanco.alunoTemp[key].telCelular
            document.getElementById('td-19').innerHTML = dadosBanco.alunoTemp[key].telResidencial
            document.getElementById('td-20').innerHTML = dadosBanco.alunoTemp[key].email
            document.getElementById('td-21').innerHTML = dadosBanco.alunoTemp[key].escolaridade
            document.getElementById('td-22').innerHTML = dadosBanco.alunoTemp[key].cursoPretendido
            //.idAlunoTemp = ""
            fs.writeFileSync('./database/banco_dados.json', JSON.stringify(dadosBanco))
        }
    }
    if ( evt && dadosBanco.idProfessorTemp != "" ) {
        let key = dadosBanco.idProfessorTemp        
        if ( dadosBanco.tipoCadastro == "professor" ) {
            document.getElementById('td-22').style.display = 'block'
            document.getElementById('td-1').innerHTML = dadosBanco.professorTemp[key].nome
            document.getElementById('td-2').innerHTML = dadosBanco.professorTemp[key].cpf
            document.getElementById('td-3').innerHTML = dadosBanco.professorTemp[key].sexo
            document.getElementById('td-4').innerHTML = dadosBanco.professorTemp[key].nascimento
            document.getElementById('td-5').innerHTML = dadosBanco.professorTemp[key].pai
            document.getElementById('td-6').innerHTML = dadosBanco.professorTemp[key].mae
            document.getElementById('td-7').innerHTML = dadosBanco.professorTemp[key].endereco
            document.getElementById('td-8').innerHTML = dadosBanco.professorTemp[key].numeroEndereco
            document.getElementById('td-9').innerHTML = dadosBanco.professorTemp[key].complemento
            document.getElementById('td-10').innerHTML = dadosBanco.professorTemp[key].bairro
            document.getElementById('td-11').innerHTML = dadosBanco.professorTemp[key].cidade
            document.getElementById('td-12').innerHTML = dadosBanco.professorTemp[key].cep
            document.getElementById('td-13').innerHTML = dadosBanco.professorTemp[key].estado
            document.getElementById('td-14').innerHTML = dadosBanco.professorTemp[key].identidade
            document.getElementById('td-15').innerHTML = dadosBanco.professorTemp[key].orgaoExpedidor
            document.getElementById('td-16').innerHTML = dadosBanco.professorTemp[key].profissao
            document.getElementById('td-17').innerHTML = dadosBanco.professorTemp[key].estadoCivil
            document.getElementById('td-18').innerHTML = dadosBanco.professorTemp[key].telCelular
            document.getElementById('td-19').innerHTML = dadosBanco.professorTemp[key].telResidencial
            document.getElementById('td-20').innerHTML = dadosBanco.professorTemp[key].email
            document.getElementById('td-21').innerHTML = dadosBanco.professorTemp[key].escolaridade
            //dadosBanco.idProfessorTemp = ""
            fs.writeFileSync('./database/banco_dados.json', JSON.stringify(dadosBanco))
        }
    }
})

function confirmaCadastro() {
    let banco = JSON.parse(fs.readFileSync('./database/banco_dados.json'))
    let watch = JSON.parse(fs.readFileSync('./database/watch.json'))
    let codigoUpdate = ""
    if ( banco.tipoCadastro == "aluno" ) {
        setTimeout(()=> {
            document.getElementById('alert-confirmacao').style.display = 'none'
            watch.confirmaCadastro = 'cadastrado'
            fs.writeFileSync('./database/watch.json', JSON.stringify(watch))
        }, 3000)
        
        Object.keys(banco.aluno).forEach( key => {
            if ( banco.idAlunoTemp == key ) {
                delete banco.aluno[key]
                codigoUpdate = 'atualizarDados'
                return
            }
        })
        if ( codigoUpdate == "atualizarDados" ) {
            banco.aluno =  {...banco.alunoTemp, ...banco.aluno}
            banco.alunoTemp = {}
            banco.idAlunoTemp = {}
            fs.writeFileSync('./database/banco_dados.json', JSON.stringify(banco))
            document.getElementById('alert-confirmacao').style.display = 'block'
            document.getElementById('alert-confirmacao').innerHTML = 'Cadastro de aluno atualizado com sucesso.'
        }else {
            banco.aluno =  {...banco.alunoTemp, ...banco.aluno}
            banco.alunoTemp = {}
            banco.idAlunoTemp = {}
            fs.writeFileSync('./database/banco_dados.json', JSON.stringify(banco))
            document.getElementById('alert-confirmacao').style.display = 'block'
            document.getElementById('alert-confirmacao').innerHTML = 'Cadastro de aluno realizado com sucesso.'
        }
    }
    if (banco.tipoCadastro == "professor" ) {
        setTimeout(()=> {
            document.getElementById('alert-confirmacao').style.display = 'none'
            watch.confirmaCadastro = 'cadastrado'
            fs.writeFileSync('./database/watch.json', JSON.stringify(watch))
        }, 3000)
        banco.professor =  {...banco.professorTemp, ...banco.professor}
        banco.professorTemp = {}
        fs.writeFileSync('./database/banco_dados.json', JSON.stringify(banco))
        document.getElementById('alert-confirmacao').style.display = 'block'
        document.getElementById('alert-confirmacao').innerHTML = 'Cadastro de professor realizado com sucesso.'
    }
}