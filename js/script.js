const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const abrirModal = () => {
    seleciona(".breadWindowArea").style.opacity = 0
    seleciona(".breadWindowArea").style.display = "flex"
    setTimeout(() => {
        seleciona(".breadWindowArea").style.opacity = 1
    }, 150)
}

const fecharModal = () => {
    seleciona(".breadWindowArea").style.opacity = 0
    setTimeout(() => {
        seleciona(".breadWindowArea").style.display = "none"
    }, 500)
}

const botoesFechar = () => {
     // document.querySelector(".breadInfo--cancelButton").addEventListener('click', (e) => {
    //     document.querySelector(".breadWindowArea").style.display = "none"
    // })

    // document.querySelector(".breadInfo--cancelMobileButton").addEventListener("click", (e) => {
    //     document.querySelector(".breadWindowArea").style.display = "none"
    // })
    selecionaTodos(".breadInfo--cancelButton, .breadInfo--cancelMobileButton").forEach((item) => {
        item.addEventListener("click", fecharModal)
    })
}

const preencheDadosDosPaes = (breadItem, item) => {
    breadItem.querySelector('.bread-item--img img').src = item.img
    breadItem.querySelector('.bread-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    breadItem.querySelector('.bread-item--name').innerHTML = item.name
    breadItem.querySelector('.bread-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
     // preenchimento dos dados
        // document.querySelector(".breadBig img").src = item.img
        // document.querySelector(".breadInfo h1").innerHTML = item.name
        // document.querySelector(".breadInfo--desc").innerHTML = item.description
        // document.querySelector(".breadInfo--actualPrice").innerHTML = `R$ ${item.price.toFixed(2)}`
        seleciona(".breadBig img").src = item.img
        seleciona(".breadInfo h1").innerHTML = item.name
        seleciona(".breadInfo--desc").innerHTML = item.description
        seleciona(".breadInfo--actualPrice").innerHTML = `R$ ${item.price.toFixed(2)}`    
}





breadJson.map((item, index ) => {
    //console.log(item)
    let breadItem = document.querySelector('.models .bread-item').cloneNode(true)
    //console.log(breadItem)
    // document.querySelector('.bread-area').append(breadItem)
    seleciona('.bread-area').append(breadItem)

    // preencher os dados de cada paes
    preencheDadosDosPaes(breadItem, item)

    // pão for clicado 
    breadItem.querySelector(".bread-item a").addEventListener('click', (e) => {
        e.preventDefault()
        console.log('clicou no pão')

        // abrir a janela modal
        document.querySelector(".breadWindowArea").style.display = "flex"

        abrirModal()

        preencheDadosModal(item)
    })

    botoesFechar()

})
