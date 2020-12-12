const fs = require('fs')
const watch = require('node-watch')

function load() {
    //regex 
    regNumeros = new RegExp('[0-9#@$%!&=*+]','g')
    regCaracter = new RegExp('[-=_°/§ªº?#@$%!&=*+]','g')
    regLetras = new RegExp("[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ#@$%!&=*+]", "g")
    regEmail1 = new RegExp(/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.[a-z]+?$/i)
    regEmail2 = new RegExp(/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+?$/i)
    regEmail3 = new RegExp("[A-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ#$%!&=*+]", "g")

    //itens formulario 
    alertErroSuperior = document.getElementById('alert-cadastro')
    caixaAlertFormulario = document.getElementById('alert-erro-form')
    caixaConfirmSairFormulario = document.getElementById('alert-confirm-sair-form')
    tipoCadastro = document.getElementsByName('tipoCadastro')
    nome = document.getElementById('inputNome')
    cpf = document.getElementById('inputCpf')
    nascimento = document.getElementById('inputNascimento')
    pai = document.getElementById('inputNomePai')
    mae = document.getElementById('inputNomeMae')
    endereco = document.getElementById('inputEndereco')
    numeroEndereco = document.getElementById('inputNumeroEndereco')
    complemento = document.getElementById('inputComplementoEndereco')
    bairro = document.getElementById('inputBairro')
    cidade = document.getElementById('inputCidade')
    cep = document.getElementById('inputCep')
    estado = document.getElementById('inputState')
    identidade = document.getElementById('inputIdentidade')
    orgaoExpedidor = document.getElementById('inputOrgaoExp')
    profissao = document.getElementById('inputProfissao')
    checkSexo = document.getElementsByName('checkSexo')
    estadoCivil = document.getElementById('inputEstadoCivil')
    telCelular = document.getElementById('inputTelCelular')
    telResidencial = document.getElementById('inputTelResidencial')
    email = document.getElementById('inputEmail')
    escolaridade = document.getElementById('inputEscolaridade')
    cursoPretendido = document.getElementsByName('cursoPretendido')

    arrayInputs = [
        nome,
        cpf,
        nascimento,
        pai,
        mae,
        endereco,
        numeroEndereco,
        complemento,
        bairro,
        cidade,
        cep,
        estado,
        identidade,
        orgaoExpedidor,
        profissao,
        estadoCivil,
        telCelular,
        telResidencial,
        email,
        escolaridade,
        ]

    idInput = ['inputNome', 'inputCpf', 'inputNascimento', 'inputNomePai', 'inputNomeMae', 'inputEndereco', 
        'inputNumeroEndereco', 'inputComplementoEndereco', 'inputBairro', 'inputCidade', 'inputCep',
        'inputState', 'inputIdentidade', 'inputOrgaoExp', 'inputProfissao', 'inputProfissao', 
        'inputEstadoCivil', 'inputTelCelular', 'inputTelResidencial', 'inputEmail', 'inputEscolaridade'
    ]
    erroCpf = ''
    erroIdentidade = ''
    erroCep = ''
    erroTelCelular = ''
    erroTelResidencial = ''
    erroNome = ''
    erroNascimento = ''
    erroPai = ''
    erroMae = ''
    erroEndereco = ''
    erroNumeroEndereco = ''
    erroComplemento = ''
    erroBairro = ''
    erroCidade = ''
    erroOrgaoExpedidor = ''
    erroProfissao = ''
    erroEstadoCivil = ''
    erroEmail = ''
    erroEscolaridade = ''

    arrayErrosInputs = [
        erroCpf,
        erroIdentidade,
        erroCep,
        erroTelCelular,
        erroTelResidencial,
        erroNome,
        erroNascimento,
        erroPai,
        erroMae,
        erroEndereco,
        erroNumeroEndereco,
        erroComplemento,
        erroBairro,
        erroCidade, 
        erroOrgaoExpedidor,
        erroProfissao,
        erroEstadoCivil,
        erroEmail,
        erroEscolaridade
    ]
    watch('./database/watch.json', { recursive: true }, function(evt, name) {
        let dadosWatchCurrent = JSON.parse(fs.readFileSync('./database/watch.json'))
        if ( evt && dadosWatchCurrent.confirmaCadastro == "cadastrado" ) {
            document.getElementById('btn-cancelar').textContent = 'Cancelar/Sair'
            arrayInputs.map(item => {
                if ( item == estado ) {
                    item.value = "* Estado"
                    return
                }
                item.value = ""
            })        
        }
    })
}

function fechaCadastro() {
    document.getElementById('linkHome').setAttribute('href', '../index.html')
    document.getElementById('linkHome').click()
}

function chamaAlertSairForm() {
    caixaConfirmSairFormulario.style.display = 'block'
}
function fechaAlertaSairCadastro() {
    caixaConfirmSairFormulario.style.display = 'none'
}

function salvarCadastro() {
    let contErr = 0
    inputErros = []

    // Nome Completo
    if ( regNumeros.test(nome.value) || nome.value == "" || nome.value.length < 2 ) {
        contErr += 1
        inputErros.push("inputNome")
    }
    // Nome do Pai
    if ( regNumeros.test(pai.value) ) {
        contErr += 1
        inputErros.push("inputNomePai")
    }
    //Nome da Mae
    if ( regNumeros.test(mae.value) || mae.value == ""  ) {
        contErr += 1
        inputErros.push("inputNomeMae")
    }
    // Bairro
    if ( regNumeros.test(bairro.value) || bairro.value == "" || typeof bairro.value == undefined  ) {
        contErr += 1
        inputErros.push("inputBairro")
    }
    // Data de Nascimento
    if ( nascimento.value == "" ) {
        contErr += 1
        inputErros.push("inputNascimento")
    }
    // Cidade
    if ( regNumeros.test(cidade.value) || cidade.value == "" || typeof cidade.value == undefined  ) {
        contErr += 1
        inputErros.push("inputCidade")
    }
    // Orgão Expedidor
    if ( regNumeros.test(orgaoExpedidor.value) ) {
        contErr += 1
        inputErros.push("inputOrgaoExp")
    }
    // Estado Civil
    if ( regNumeros.test(estadoCivil.value) || estadoCivil.value == "" ) {
        contErr += 1
        inputErros.push("inputEstadoCivil")
    }
    // Profissão
    if ( regNumeros.test(profissao.value) ) {
        contErr += 1
        inputErros.push("inputProfissao")
    }
    // Escolaridade
    if ( regNumeros.test(escolaridade.value) || escolaridade.value == "" ) {
        contErr += 1
        inputErros.push("inputEscolaridade")
    }    
    // CPF
    if( cpf.value.length < 14 || regLetras.test(cpf.value) || cpf.value == "" ) {
        inputErros.push('inputCpf')
        contErr += 1
    }
    // Identidade
    if( identidade.value.length < 12 || regLetras.test(identidade.value) || identidade.value == "" ) {
        inputErros.push('inputIdentidade')
        contErr += 1
    }
    // Endereço
    if ( regNumeros.test(endereco.value) || endereco.value == "" ) {
        contErr += 1
        inputErros.push("inputEndereco")
    }
    // Complemento
    if ( regCaracter.test(complemento.value) ) {
        contErr += 1
        inputErros.push("inputComplementoEndereco")
    }
    // Numero Endereço
    if ( regLetras.test(numeroEndereco.value) ) {
        contErr += 1
        inputErros.push("inputNumeroEndereco")
    }
    // Cep
    if ( regLetras.test(cep.value) || cep.value == "" || cep.value.length < 9 ) {
        contErr += 1
        inputErros.push("inputCep")
    }
    // Celular 
    if ( regLetras.test(telCelular.value) || telCelular.value == "" || telCelular.value.length < 15 ) {
        contErr += 1
        inputErros.push("inputTelCelular")
    }
    // Residencial
    if ( regLetras.test(telResidencial.value) || telResidencial.value.length > 0 && telResidencial.value.length < 14 ) {
        contErr += 1
        inputErros.push("inputTelResidencial")
    }
    // Email
    if ( !regEmail1.test(email.value) && !regEmail2.test(email.value) && email.value != "" || regEmail3.test(email.value) && email.value != "" ) {
        contErr += 1
        inputErros.push("inputEmail")
    }
    // Estado
    if ( estado.value == "* Estado" ) {
        contErr += 1
        inputErros.push("inputState")
    }
    // inserção de dados no banco
    if ( contErr >= 0 ) {
        let valueTipoCadastro
        let valueCheckSexo
        let valueCursoPretendido
        let dadosBanco = JSON.parse(fs.readFileSync('./database/banco_dados.json'))
        document.getElementById('alert-cadastro').style.display = "none"
        idInput.map( item => {
            document.getElementById(item).style.border = "1px solid #ced4da"
        })
        for ( i = 0; i < tipoCadastro.length; i++ ) {
            if ( tipoCadastro[i].checked ) {
                valueTipoCadastro = tipoCadastro[i].value
            }
        }
        for ( i = 0; i < checkSexo.length; i++ ) {
            if ( checkSexo[i].checked ) {
                valueCheckSexo = checkSexo[i].value
                arrayInputs.push(valueCheckSexo)
            }
        }
        for ( i = 0; i < cursoPretendido.length; i++ ) {
            if ( cursoPretendido[i].checked ) {
                valueCursoPretendido = cursoPretendido[i].value
                arrayInputs.push(valueCursoPretendido)
            }
        }
        let nascimentoParte3 = nascimento.value.slice(0, 4)
        let nascimentoParte2 = nascimento.value.slice(5, 7)
        let nascimentoParte1 = nascimento.value.slice(8, 10)
        let nascimentoTipoBrasil = `${nascimentoParte1}-${nascimentoParte2}-${nascimentoParte3}`
        if ( valueTipoCadastro == 1 ) {
            dadosBanco.alunoTemp[cpf.value] = {
                nome: nome.value,
                cpf: cpf.value,
                sexo: valueCheckSexo,
                nascimento: nascimentoTipoBrasil,
                pai: pai.value == ""? "não informado": pai.value,
                mae: mae.value,
                endereco: endereco.value,
                numeroEndereco: numeroEndereco.value == ""? "não informado": numeroEndereco.value,
                complemento: complemento.value == ""? "não informado": complemento.value,
                bairro: bairro.value,
                cidade: cidade.value,
                cep: cep.value == ""? "não informado": cep.value,
                estado: estado.value,
                identidade: identidade.value,
                orgaoExpedidor: orgaoExpedidor.value == ""? "não informado": orgaoExpedidor.value,
                profissao: profissao.value == ""? "não informado": profissao.value,
                estadoCivil: estadoCivil.value,
                telCelular: telCelular.value,
                telResidencial: telResidencial.value == ""? "não informado": telResidencial.value,
                email: email.value == ""? "não informado": email.value,
                escolaridade: escolaridade.value,
                cursoPretendido: valueCursoPretendido
            }
            dadosBanco.tipoCadastro = "aluno"
            dadosBanco.idAlunoTemp = cpf.value
            fs.writeFileSync('./database/banco_dados.json', JSON.stringify(dadosBanco))
            let dadosWatch = JSON.parse(fs.readFileSync('./database/watch.json'))
            dadosWatch.confirmaCadastro = "abrir"
            fs.writeFileSync('./database/watch.json', JSON.stringify(dadosWatch))
        }
        if ( valueTipoCadastro == 2 ) {
            dadosBanco.professorTemp[cpf.value] = {
                nome: nome.value,
                cpf: cpf.value,
                sexo: valueCheckSexo,
                nascimento: nascimentoTipoBrasil,
                pai: pai.value == ""? "não informado": pai.value,
                mae: mae.value,
                endereco: endereco.value,
                numeroEndereco: numeroEndereco.value == ""? "não informado": numeroEndereco.value,
                complemento: complemento.value == ""? "não informado": complemento.value,
                bairro: bairro.value,
                cidade: cidade.value,
                cep: cep.value == ""? "não informado": cep.value,
                estado: estado.value,
                identidade: identidade.value,
                orgaoExpedidor: orgaoExpedidor.value == ""? "não informado": orgaoExpedidor.value,
                profissao: profissao.value == ""? "não informado": profissao.value,
                estadoCivil: estadoCivil.value,
                telCelular: telCelular.value,
                telResidencial: telResidencial.value == ""? "não informado": telResidencial.value,
                email: email.value == ""? "não informado": email.value,
                escolaridade: escolaridade.value  
            }
            dadosBanco.tipoCadastro = "professor"
            let dadosWatch = JSON.parse(fs.readFileSync('./database/watch.json'))
            dadosWatch.confirmaCadastro = "abrir"
            fs.writeFileSync('./database/watch.json', JSON.stringify(dadosWatch))
            fs.writeFileSync('./database/banco_dados.json', JSON.stringify(dadosBanco))
        }
    }
    // mostrar alertas de erros
    if ( contErr > 0 ) {
        alertErroSuperior.style.display = 'block'
        if ( contErr == 1 ) {
            alertErroSuperior.innerHTML = "<strong>Campo com erro! : </strong>"+ "Observar o campo em vermelho, houve um erro ao preencher-lo."
        }
        if ( contErr > 1 ) {
            alertErroSuperior.innerHTML = "<strong>Campos com erro! : </strong>"+ "Observar os campos em vermelho, houve um erro ao preencher-los."
        }
        idInput.map( item => {
            
            document.getElementById(item).style.border = "1px solid #ced4da"
        })
        inputErros.map( item => {
            document.getElementById(item).style.border = "2px solid #dc3546a8"
        })
    }    
}

function resolveCep() {
    if ( event.keyCode != 8 ) {
        if ( cep.value.length == 5 ) {
            cep.value += '-'
        }
        if ( cep.value.length == 9 && erroCep == 'nao' ) {
            let cepLimpo = cep.value.replace('-', '')
            let url = `https://viacep.com.br/ws/${cepLimpo}/json/`
            fetch(url)
                .then((response)=> {
                    return response.json()
                })
                .then((data)=> {
                    if ( data.bairro == undefined ) {
                        bairro.value = ""
                    }
                    if ( data.bairro ) {
                        bairro.value = data.bairro
                    }
                    if ( data.endereco == undefined) {
                        endereco.value = ""
                    }
                    if ( data.logradouro ) {
                        endereco.value = data.logradouro
                    }
                    if ( data.complemento == undefined ) {
                        complemento.value = ""
                    }
                    if ( data.complemento ) {
                        complemento.value = data.complemento
                    }
                    if ( data.cidade == undefined ) {
                        cidade.value = ""
                    }
                    if ( data.localidade ) {
                        cidade.value = data.localidade
                    }
                })   
        }
        if ( regLetras.test(cep.value) ) {
            cep.style.border = "2px solid #dc3546a8"
            erroCep = 'sim'
        }else {
            cep.style.border = "1px solid #ced4da"
            erroCep = 'nao'
            inputErros.splice(inputErros.indexOf('inputCep'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
    if ( event.keyCode == 8 ) {
        if ( cep.value.length == 0 ) {
            cep.style.border = "1px solid #ced4da"
            erroCep = 'nao'
            inputErros.splice(inputErros.indexOf('inputCep'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
        if ( regLetras.test(cep.value) ) {
            cep.style.border = "2px solid #dc3546a8"
            erroCep = 'sim'
        }else if (!regLetras.test(cep.value)) {
            cep.style.border = "1px solid #ced4da"
            erroCep = 'nao'
            inputErros.splice(inputErros.indexOf('inputCep'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
}

function resolveCpf() { 
    if ( event.keyCode != 8 ) {
        if ( cpf.value.length == 3 || cpf.value.length == 7 ) {
            cpf.value += '.'
        }
        if ( cpf.value.length == 11 ) {
           cpf.value += '-' 
        }
        if ( regLetras.test(cpf.value) ) {
            cpf.style.border = "2px solid #dc3546a8"
            erroCpf = 'sim'
        }else {
            cpf.style.border = "1px solid #ced4da"
            erroCpf = 'nao'
            inputErros.splice(inputErros.indexOf('inputCpf'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
    if ( event.keyCode == 8 ) {
        if ( cpf.value.length == 0 ) {
            cpf.style.border = "1px solid #ced4da"
            erroCpf = 'nao'
            inputErros.splice(inputErros.indexOf('inputCpf'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
        if ( regLetras.test(cpf.value) ) {
            cpf.style.border = "2px solid #dc3546a8"
            erroCpf = 'sim'
        }else if (!regLetras.test(cpf.value)) {
            cpf.style.border = "1px solid #ced4da"
            erroCpf = 'nao'
            inputErros.splice(inputErros.indexOf('inputCpf'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
    
}

function resolveRg() {
    if ( event.keyCode != 8 ) {
        if ( identidade.value.length == 2 || identidade.value.length == 6 ) {
            identidade.value += '.'
        }
        if ( identidade.value.length == 10 ) {
           identidade.value += '-' 
        }
        if ( regLetras.test(identidade.value) ) {
            identidade.style.border = "2px solid #dc3546a8"
            erroIdentidade = 'sim'
        }else {
            identidade.style.border = "1px solid #ced4da"
            erroIdentidade = 'nao'
            inputErros.splice(inputErros.indexOf('inputIdentidade'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
    if ( event.keyCode == 8 ) {
        if ( identidade.value.length == 0 ) {
            identidade.style.border = "1px solid #ced4da"
            erroIdentidade = 'nao'
            inputErros.splice(inputErros.indexOf('inputIdentidade'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
        if ( regLetras.test(identidade.value) ) {
            identidade.style.border = "2px solid #dc3546a8"
            erroIdentidade = 'sim'
        }else if (!regLetras.test(identidade.value)) {
            identidade.style.border = "1px solid #ced4da"
            erroIdentidade = 'nao'
            inputErros.splice(inputErros.indexOf('inputIdentidade'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
}

function resolveCelular() {
    if ( event.keyCode != 8 ) {
        if ( telCelular.value.length == 1 ) {
            telCelular.value = "(" + telCelular.value
        }
        if ( telCelular.value.length == 3 ) {
            telCelular.value += ") "
        }
        if ( telCelular.value.length == 10 ) {
            telCelular.value += "-"
        }
        if ( regLetras.test(telCelular.value) ) {
            telCelular.style.border = "2px solid #dc3546a8"
            erroTelCelular = 'sim'
        }else if (!regLetras.test(telCelular.value)) {
            telCelular.style.border = "1px solid #ced4da"
            erroTelCelular = 'nao'
            inputErros.splice(inputErros.indexOf('inputTelCelular'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
    if ( event.keyCode == 8 ) {
        if ( telCelular.value.length == 0 ) {
            telCelular.style.border = "1px solid #ced4da"
            erroTelCelular = 'nao'
            inputErros.splice(inputErros.indexOf('inputTelCelular'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
        if ( regLetras.test(telCelular.value) ) {
            telCelular.style.border = "2px solid #dc3546a8"
            erroTelCelular = 'sim'
        }else if (!regLetras.test(telCelular.value)) {
            telCelular.style.border = "1px solid #ced4da"
            erroTelCelular = 'nao'
            inputErros.splice(inputErros.indexOf('inputTelCelular'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
}

function resolveResidencial() {
    if ( event.keyCode != 8 ) {
        if ( telResidencial.value.length == 1 ) {
            telResidencial.value = "(" + telResidencial.value
        }
        if ( telResidencial.value.length == 3 ) {
            telResidencial.value += ") "
        }
        if ( telResidencial.value.length == 9 ) {
            telResidencial.value += "-"
        }
        if ( regLetras.test(telResidencial.value) ) {
            telResidencial.style.border = "2px solid #dc3546a8"
            erroTelResidencial = 'sim'
        }else if (!regLetras.test(telResidencial.value)) {
            telResidencial.style.border = "1px solid #ced4da"
            erroTelResidencial = 'nao'
            inputErros.splice(inputErros.indexOf('inputTelResidencial'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }

    }
    if ( event.keyCode == 8 ) {
        if ( telResidencial.value.length == 0 ) {
            telResidencial.style.border = "1px solid #ced4da"
            erroTelResidencial = 'nao'
            inputErros.splice(inputErros.indexOf('inputTelResidencial'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
        if ( regLetras.test(telResidencial.value) ) {
            telResidencial.style.border = "2px solid #dc3546a8"
            erroTelResidencial = 'sim'
        }else if (!regLetras.test(telResidencial.value)) {
            telResidencial.style.border = "1px solid #ced4da"
            erroTelResidencial = 'nao'
            inputErros.splice(inputErros.indexOf('inputTelResidencial'), 1) // apaga erro do array de erros
            caixaAlertFormulario.style.display = 'none'
        }
    }
}

function resolveEstado() {
    estado.style.border = "1px solid #ced4da"
    inputErros.splice(inputErros.indexOf('inputState'), 1) // apaga erro do array de erros
    caixaAlertFormulario.style.display = 'none'    
}

// onkeyup para os demais inputs para tirar o erro ao teclar o primeiro caracter
function resolveErro(idInput) {
    if ( idInput  == "inputNome" ) {
        if ( event.keyCode != 8 && nome.value.length == 1 ) {
            if ( regNumeros.test(nome.value) ) {
                nome.style.border = "2px solid #dc3546a8"
                erroNome = 'sim'
            }else if (!regNumeros.test(nome.value)) {
                nome.style.border = "1px solid #ced4da"
                erroNome = 'nao'
                inputErros.splice(inputErros.indexOf('inputNome'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputNascimento" ) {
        if ( event.keyCode != 8 ) {
            if ( nascimento.value == "") {
                nascimento.style.border = "2px solid #dc3546a8"
                erroNascimento = 'sim'
            }else if ( nascimento.value ) {
                nascimento.style.border = "1px solid #ced4da"
                erroNascimento = 'nao'
                inputErros.splice(inputErros.indexOf('inputNascimento'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputNomePai" ) {
        if ( event.keyCode != 8 && pai.value.length == 1 ) {
            if ( regNumeros.test(pai.value) ) {
                pai.style.border = "2px solid #dc3546a8"
                erroPai = 'sim'
            }else if (!regNumeros.test(pai.value)) {
                pai.style.border = "1px solid #ced4da"
                erroPai = 'nao'
                inputErros.splice(inputErros.indexOf('inputNomePai'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputNomeMae" ) {
        if ( event.keyCode != 8 && mae.value.length == 1 ) {
            if ( regNumeros.test(mae.value) ) {
                mae.style.border = "2px solid #dc3546a8"
                erroMae = 'sim'
            }else if (!regNumeros.test(mae.value)) {
                mae.style.border = "1px solid #ced4da"
                erroMae = 'nao'
                inputErros.splice(inputErros.indexOf('inputNomeMae'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputEndereco" ) {
        if ( event.keyCode != 8 && endereco.value.length == 1 ) {
            if ( regNumeros.test(endereco.value) ) {
                endereco.style.border = "2px solid #dc3546a8"
                erroEndereco = 'sim'
            }else if (!regNumeros.test(endereco.value)) {
                endereco.style.border = "1px solid #ced4da"
                erroEndereco = 'nao'
                inputErros.splice(inputErros.indexOf('inputEndereco'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputNumeroEndereco" ) {
        if ( event.keyCode != 8 && numeroEndereco.value.length == 1 ) {
            if ( regLetras.test(numeroEndereco.value) ) {
                numeroEndereco.style.border = "2px solid #dc3546a8"
                erroNumeroEndereco = 'sim'
            }else if (!regLetras.test(numeroEndereco.value)) {
                numeroEndereco.style.border = "1px solid #ced4da"
                erroNumeroEndereco = 'nao'
                inputErros.splice(inputErros.indexOf('inputNumeroEndereco'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputComplementoEndereco" ) {
        if ( event.keyCode != 8 && complemento.value.length == 1 ) {
            if ( regNumeros.test(complemento.value) ) {
                complemento.style.border = "2px solid #dc3546a8"
                erroComplemento = 'sim'
            }else if (!regNumeros.test(complemento.value)) {
                complemento.style.border = "1px solid #ced4da"
                erroComplemento = 'nao'
                inputErros.splice(inputErros.indexOf('inputComplementoEndereco'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputBairro" ) {
        if ( event.keyCode != 8 && bairro.value.length == 1 ) {
            if ( regNumeros.test(bairro.value) ) {
                bairro.style.border = "2px solid #dc3546a8"
                erroBairro = 'sim'
            }else if (!regNumeros.test(bairro.value)) {
                bairro.style.border = "1px solid #ced4da"
                erroBairro = 'nao'
                inputErros.splice(inputErros.indexOf('inputBairro'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputCidade" ) {
        if ( event.keyCode != 8 && cidade.value.length == 1 ) {
            if ( regNumeros.test(cidade.value) ) {
                cidade.style.border = "2px solid #dc3546a8"
                erroCidade = 'sim'
            }else if (!regNumeros.test(cidade.value)) {
                cidade.style.border = "1px solid #ced4da"
                erroCidade = 'nao'
                inputErros.splice(inputErros.indexOf('inputCidade'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputOrgaoExp" ) {
        if ( event.keyCode != 8 && orgaoExpedidor.value.length == 1 ) {
            if ( regNumeros.test(orgaoExpedidor.value) ) {
                orgaoExpedidor.style.border = "2px solid #dc3546a8"
                erroOrgaoExpedidor = 'sim'
            }else if (!regNumeros.test(orgaoExpedidor.value)) {
                orgaoExpedidor.style.border = "1px solid #ced4da"
                erroOrgaoExpedidor = 'nao'
                inputErros.splice(inputErros.indexOf('inputOrgaoExp'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputProfissao" ) {
        if ( event.keyCode != 8 && profissao.value.length == 1 ) {
            if ( regNumeros.test(profissao.value) ) {
                profissao.style.border = "2px solid #dc3546a8"
                erroProfissao = 'sim'
            }else if (!regNumeros.test(profissao.value)) {
                profissao.style.border = "1px solid #ced4da"
                erroProfissao = 'nao'
                inputErros.splice(inputErros.indexOf('inputProfissao'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputEstadoCivil" ) {
        if ( event.keyCode != 8 && estadoCivil.value.length == 1 ) {
            if ( regNumeros.test(estadoCivil.value) ) {
                estadoCivil.style.border = "2px solid #dc3546a8"
                erroEstadoCivil = 'sim'
            }else if (!regNumeros.test(estadoCivil.value)) {
                estadoCivil.style.border = "1px solid #ced4da"
                erroEstadoCivil = 'nao'
                inputErros.splice(inputErros.indexOf('inputEstadoCivil'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputEmail" ) {
        if ( event.keyCode != 8 && email.value.length == 1 ) {
            if ( regCaracter.test(email.value) ) {
                email.style.border = "2px solid #dc3546a8"
                erroEmail = 'sim'
            }else if (!regNumeros.test(email.value)) {
                email.style.border = "1px solid #ced4da"
                erroEmail = 'nao'
                inputErros.splice(inputErros.indexOf('inputEmail'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
    if ( idInput  == "inputEscolaridade" ) {
        if ( event.keyCode != 8 && escolaridade.value.length == 1 ) {
            if ( regNumeros.test(escolaridade.value) ) {
                escolaridade.style.border = "2px solid #dc3546a8"
                erroEscolaridade = 'sim'
            }else if (!regNumeros.test(escolaridade.value)) {
                escolaridade.style.border = "1px solid #ced4da"
                erroEscolaridade = 'nao'
                inputErros.splice(inputErros.indexOf('inputEscolaridade'), 1) // apaga erro do array de erros
                caixaAlertFormulario.style.display = 'none'
            }
        }
    }
}

function infoMouseUp(idInput) {

    if ( idInput == 'linkNav' ) {
        caixaAlertFormulario.style.display = 'block'
        caixaAlertFormulario.innerHTML = 'Esta barra de navegação esta desabilitada aqui no <strong>Cadastro.</strong></br>Você precisa salvar ou cancelar.'
    }
    if ( idInput == 'inputNome' ) {
        if ( inputErros.indexOf('inputNome') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'

        }
    } 
    if ( idInput == 'inputCpf' ) {
        if ( erroCpf == 'sim' ) {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.</br>* Campo obrigatório.'
        }else {
            if ( inputErros.indexOf('inputCpf') == -1 ) {
                caixaAlertFormulario.style.display = 'none'
            }else {
                caixaAlertFormulario.style.display = 'block'
                caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.</br>* Campo obrigatório.'
    
            }
        }
    }  
    if ( idInput == 'inputCep' ) {
        if ( erroCep == 'sim' ) {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.'
        }else {
            if ( inputErros.indexOf('inputCep') == -1 ) {
                caixaAlertFormulario.style.display = 'none'
            }else {
                caixaAlertFormulario.style.display = 'block'
                caixaAlertFormulario.style.marginTop = '10px'
                caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.'
    
            }
        }
    }
    if ( idInput == 'inputIdentidade' ) {
        if ( erroIdentidade == 'sim' ) {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.</br>* Campo obrigatório.'
        }else {
            if ( inputErros.indexOf('inputIdentidade') == -1 ) {
                caixaAlertFormulario.style.display = 'none'
            }else {
                caixaAlertFormulario.style.display = 'block'
                caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.</br>* Campo obrigatório.'
    
            }
        }
    }
    if ( idInput == 'inputNascimento' ) {
        if ( inputErros.indexOf('inputNascimento') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.</br>* Campo obrigatório.'

        }
    }
    if ( idInput == 'inputNomePai' ) {
        if ( inputErros.indexOf('inputNomePai') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.'

        }
    }
    if ( idInput == 'inputNomeMae' ) {
        if ( inputErros.indexOf('inputNomeMae') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'

        }
    }
    if ( idInput == 'inputEndereco' ) {
        if ( inputErros.indexOf('inputEndereco') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.style.marginTop = '10px'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'
        }
    }
    if ( idInput == 'inputNumeroEndereco' ) {
        if ( inputErros.indexOf('inputNumeroEndereco') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.'

        }
    }
    if ( idInput == 'inputBairro' ) {
        if ( inputErros.indexOf('inputBairro') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.style.marginTop = '10px'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'

        }
    }
    if ( idInput == 'inputCidade' ) {
        if ( inputErros.indexOf('inputCidade') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.style.marginTop = '10px'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'
        }
    }
    if ( idInput == 'inputState' ) {
        if ( inputErros.indexOf('inputState') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.style.marginTop = '10px'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a fazer uma escolha.</br>* Campo obrigatório.'
        }
    }
    if ( idInput == 'inputOrgaoExp' ) {
        if ( inputErros.indexOf('inputOrgaoExp') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.'

        }
    }
    if ( idInput == 'inputProfissao' ) {
        if ( inputErros.indexOf('inputProfissao') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.'

        }
    }
    if ( idInput == 'inputEstadoCivil' ) {
        if ( inputErros.indexOf('inputEstadoCivil') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'
        }
    }
    if ( idInput == 'inputTelCelular' ) {
        if ( erroTelCelular == 'sim' ) {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.'
        }else {
            if ( inputErros.indexOf('inputTelCelular') == -1 ) {
                caixaAlertFormulario.style.display = 'none'
            }else {
                caixaAlertFormulario.style.display = 'block'
                caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.</br>* Campo obrigatório.'
            }
        }
    }
    if ( idInput == 'inputTelResidencial' ) {
        if ( erroTelResidencial == 'sim' ) {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.'
        }else {
            if ( inputErros.indexOf('inputTelResidencial') == -1 ) {
                caixaAlertFormulario.style.display = 'none'
            }else {
                caixaAlertFormulario.style.display = 'block'
                caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas números.'

            }
        }
    }
    if ( idInput == 'inputEmail' ) {
        if ( inputErros.indexOf('inputEmail') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo necessita de "@" exemplo( gmark@gmark.com.br ).'

        }
    }
    if ( idInput == 'inputEscolaridade' ) {
        if ( inputErros.indexOf('inputEscolaridade') == -1 ) {
            caixaAlertFormulario.style.display = 'none'
        }else {
            caixaAlertFormulario.style.display = 'block'
            caixaAlertFormulario.innerHTML = 'Este campo é destinado a usar apenas letras.</br>* Campo obrigatório.'

        }
    }
}

function infoMouseOut() {
    caixaAlertFormulario.style.marginTop = '100px'
    caixaAlertFormulario.style.display = 'none'
}
