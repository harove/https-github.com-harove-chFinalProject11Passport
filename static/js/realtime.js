const ul = document.querySelector('.realtimeul')

const socket = io();

socket.on('newProduct',({products})=>{
    ul.innerHTML = ''
    products.map(product => {
        const li = document.createElement('li')
        li.innerHTML = `${product.title} ${product.code}`
        ul.appendChild(li)
    })
})