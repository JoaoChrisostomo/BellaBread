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

const adicionarAoCarrinho = () => {
    seleciona(".breadInfo--addButton").addEventListener("click", () => {
            console.log("adicionar ao carrinho")

        // pegar dados da janela modal atual
        // qual pao? pegue o modalKey para usar o breadJson[modalKey]
        console.log("Pao " + modalKey)
        //tamanho
        let size = seleciona(".breadInfo--size.selected").getAttribute("data-key")
        console.log("Tamanho " + size)
        // quantidade
        console.log("Quant. " + quantBreads)
        // preco
        let price = seleciona(".breadInfo--actualPrice").innerHTML.replace("R$&nbsp;", "")

        // crie um identificador que junte id e tamanho
        // concatene as duas informacoes separadas por um símbolo, voce escolhe
        let identificador = breadJson[modalKey].id+"t"+size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantBreads
        } else {
            // nao tem, entao crie um novo item
            let bread = {
                identificador,
                id: breadJson[modalKey].id,
                size,
                qt: quantBreads,
                price: parseFloat(price)
            }
            cart.push(bread)
            console.log(bread)
            console.log("Sub total R$ " + (bread.qt * bread.price).toFixed(2))
        }
        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
        
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}


const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {
		// mostrar o carrinho
		seleciona('aside').classList.add('show')
		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''
        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0.10
        let imposto  = 0.02
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let breadItem = breadJson.find( (item) => item.id == cart[i].id )
			console.log(breadItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let breadSizeName = cart[i].size

			let breadName = `${breadItem.name} (${breadSizeName})`

			// preencher as informacoes
			cartItem.querySelector('img').src = breadItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = breadName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}
                
                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})
			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1  
		const valorDescontado = subtotal * desconto
        console.log(valorDescontado)   

        // IPI (imposto de produtos industrializados)
        const impostoIpi = subtotal * imposto
       
        // valor final total do carrinho
        const valorTotal = (subtotal - valorDescontado) - impostoIpi
        console.log(valorTotal)
		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(valorDescontado)
        seleciona('.imposto span:last-child').innerHTML  = formatoReal(impostoIpi)
		seleciona('.total span:last-child').innerHTML    = formatoReal(valorTotal)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        
        function abreModal(e) {
            const abrirModal = document.querySelector('.modal-confirmar');
            abrirModal.classList.add('show');
            abrirModal.style.display = 'block';
        }

        function closeModal() {
            const fecharModal = document.querySelector('.fechar-modal');
            Button.addEventListener('click', fecharModal)
            modal.style.display = 'none';
        }
        
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
        
        abreModal()
        closeModal()
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

adicionarAoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
