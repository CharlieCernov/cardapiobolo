const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)

cakeJson.map((item,index) =>{
    
    let cakeItem = document.querySelector('.models .cake-item').cloneNode(true)

    cakeItem.setAttribute('data-key',index)

    //adicionando o nome do bolo
    cakeItem.querySelector('.cake-item--name').innerHTML = item.name
    //adicionar a descrição e preço do bolo
    cakeItem.querySelector('.cake-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    //adicionar a descrição
    cakeItem.querySelector('.cake-item--desc').innerHTML = item.description
    //colocar a imagem
    cakeItem.querySelector('.cake-item--img img').src = item.img
    //colocando evento pra abrir a janelinha de pedido
    cakeItem.querySelector('a').addEventListener('click',(e) =>{
        
        
        e.preventDefault()

        let key = e.target.closest('.cake-item').getAttribute('data-key')

        //pegando o nome do bolo
        c('.cakeInfo h1').innerHTML = cakeJson[key].name
        
        //pegando desc do bolo
        c('.cakeInfo--desc').innerHTML = cakeJson[key].description

        //pegando o nome do preço
        c('.cakeInfo--actualPrice').innerHTML = `R$ ${cakeJson[key].price.toFixed(2)}`

        //tamanho dos bolos
        cs('.cakeInfo--size').forEach((size, sizeIndex) =>{
            size.querySelector('span').innerHTML = cakeJson[key].sizes[sizeIndex]
        })
        
        //colocando a imagem
        c('.cakeBig img').src = cakeJson[key].img

        //testando o bolo clicado 
        //alert("BOLO CLICADO"+key)

        c('.cakeWindowArea').style.opacity = 0
        c('.cakeWindowArea').style.display = 'flex'

        setTimeout(()=>{
            c('.cakeWindowArea').style.opacity = 1   
        },200)
    })

    //botão cancelar junto com o evento modal
    cs('.cakeInfo--cancelButton, .cakeInfo--cancelMobileButton').forEach((item)=>{
        item.addEventListener('click',closeModal)
    })

    c('.cake-area').append(cakeItem)

})

//eventos do modal

function closeModal(){
    c('.cakeWindowArea').style.opacity = '0' // ficar invisível

    setTimeout(() =>{
        c('.cakeWindowArea').style.display = 'none' //fechar o modal
    },500) // em 0,5 segundos

    cs('.cakeInfo--cancelButton, .cakeInfo--cancelMobileButton').forEach((item)=>{
        item.addEventListener('click', closeModal)
    })
}