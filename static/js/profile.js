const formLogout = document.querySelector('form')
const spans = document.querySelectorAll('span')

formLogout?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/sesiones/current', {
    method: 'DELETE'
  })

  if (response.status === 204) {
    window.location.href = '/login'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})


window.addEventListener('load', async ()=>{
  const response = await fetch('/api/usuarios/current')

  if (response.status === 403) {
    alert('necesitas loguearte para ver esta info!')
    return (window.location.href = '/login')
  }

  const result = await response.json()
  const usuario = result.payload

  spans[0].innerHTML = usuario.nombre
  spans[1].innerHTML = usuario.apellido
  spans[2].innerHTML = usuario.email

})