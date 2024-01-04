// const username = prompt('bienvenido al chat, ingrese su nombre')

const form = document.querySelector('form')

const inputMensaje = document.querySelector('input')

const ulMensajes = document.querySelector('ul')


Swal.fire({
    title: "Submit username",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Look up",
  }).then((result) => {
    if (result.isConfirmed) {
        iniciarChat(result.value)
    }
    inputMensaje?.focus()
});

//connect to the Socked.IO server
const socket = io()



function iniciarChat(username){
    const socket = io({
        auth: {
            username
        }
    })

    form?.addEventListener('submit', event=>{
        event.preventDefault()
        const mensaje = inputMensaje?.value
        if (mensaje){
            socket.emit('mensaje', {
                timestamp:new Date().now,
                username, mensaje})
        }
    })

    socket.on('nuevoUsuario', nuevoUsuario=>{
        console.log('nuevo usuario' + nuevoUsuario)
        Swal.fire({
            text: 'nuevo usuario' + nuevoUsuario,
            toast: true,
            position: 'top-right'
        })
    })



    socket.on('usuarioDesconectado', usuarioDesconectado=>{
        Swal.fire({
            text: usuarioDesconectado + 'ha abandonado la conexion',
            toast: true,
            position: 'top-right'
        })
    })

    socket.on('mensajes', mensajes=>{
        ulMensajes.innerHTML = ''
        for(const {timestamp, user, message} of mensajes ){
            const li = document.createElement('li')
            li.innerHTML = `${user}: ${message}`
            ulMensajes?.appendChild(li)
        }
    })

}

