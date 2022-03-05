// criar a variavel modalkey para ser global
let modalKey = 0
// variavel para controlar a quantidade inicial de breads na modal
let quantBreads = 1
// carrinho
let cart = []

const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    } 
}

const abrirModal = () => {
    seleciona(".breadWindowArea").style.opacity = 0 // transparent
    seleciona(".breadWindowArea").style.display = "flex"
    setTimeout(() => seleciona(".breadWindowArea").style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona(".breadWindowArea").style.opacity = 0 // transparent
    setTimeout(() => seleciona(".breadWindowArea").style.display = "none", 500)
}

const botoesFechar = () => {
    selecionaTodos(".breadInfo--cancelButton, .breadInfo--cancelMobileButton").forEach( (item) => item.
    addEventListener("click", fecharModal) )
}

const preencheDadosDosPaes = (breadItem, item, index) => {
    // setando um atrinuto para cada item do breadItem
    breadItem.setAttribute("data-key", index)
    breadItem.querySelector('.bread-item--img img').src = item.img
    breadItem.querySelector('.bread-item--price').innerHTML = formatoReal(item.price[2])
    breadItem.querySelector('.bread-item--name').innerHTML = item.name
    breadItem.querySelector('.bread-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
     // preenchimento dos dados da janela modal
        seleciona(".breadBig img").src = item.img
        seleciona(".breadInfo h1").innerHTML = item.name
        seleciona(".breadInfo--desc").innerHTML = item.description
        seleciona(".breadInfo--actualPrice").innerHTML = formatoReal(item.price[2])    
}

const pegarKey = (e) => {
    // closet retorna o elemento mais proximo que tem a class que passamos
    // do bread-item ele vai pegar o valor do atributo data-key

    let key = e.target.closest(".bread-item").getAttribute("data-key")
    console.log('pao clicado' + key)
    console.log(breadJson[key])

    quantBreads = 1

    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a sele de tamanho atual e selecionar o tamanho grande
    seleciona(".breadInfo--size.selected").classList.remove("selected")

    //selecionar todos os tamanhos
    selecionaTodos(".breadInfo--size").forEach((size, sizeIndex) => {
        //selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add("selected") : ''
        size.querySelector("span").innerHTML = breadJson[key].sizes[sizeIndex]
    })
}    

const escolherTamanhoPreco = (key) => {
    // acoes nos botoes de tamanho
    // selecionar todos os tamanhos
    selecionaTodos(".breadInfo--size").forEach((size, sizeIndex) => {
        size.addEventListener("click", (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o que voce clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona(".breadInfo--size.selected").classList.remove("selected")
            // marcar o que voce clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add("selected")

            // mudar o preco de acordo com tamanho do pao
            seleciona(".breadInfo--actualPrice").innerHTML = formatoReal(breadJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.breadInfo--qtmais').addEventListener('click', () => {
        quantBreads++
        seleciona('.breadInfo--qt').innerHTML = quantBreads
    })

    seleciona('.breadInfo--qtmenos').addEventListener('click', () => {
        if(quantBreads > 1) {
            quantBreads--
            seleciona('.breadInfo--qt').innerHTML = quantBreads
        }
    })
}

breadJson.map((item, index ) => {
    //console.log(item)
    let breadItem = document.querySelector('.models .bread-item').cloneNode(true)
    //console.log(breadItem)
    // document.querySelector('.bread-area').append(breadItem)
    seleciona('.bread-area').append(breadItem)

    // preencher os dados de cada paes
    preencheDadosDosPaes(breadItem, item, index)

    // pão for clicado 
    breadItem.querySelector(".bread-item a").addEventListener('click', (e) => {
        e.preventDefault()
        console.log('clicou no pão')

        let chave = pegarKey(e)
        
        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

         // pegar tamanho selecionado
         preencherTamanhos(chave)

        // definir quantidade inicial como 1
		seleciona('.breadInfo--qt').innerHTML = quantBreads


        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
    })

    botoesFechar()

})

// mudar quantidade com os botoes + e -
mudarQuantidade()
