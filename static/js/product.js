import { httpClient } from './httpClient.js';
// Retrieve the payload data from the data attribute
  const payloadDataElement = document.getElementById('payload-data');
  const payloadDataString = payloadDataElement.dataset.payload;
  const payload = JSON.parse(payloadDataString)

const button = document.querySelector('button')

const addProduct = async (cartId, productId)=>{
    const response = await httpClient(`/api/carts/${cartId}/products/${productId}`,'POST')
    if (!response.ok) {
        throw new Error('Failed create a product');
    }
    const product = await response.json()
}


const createCart = async () =>{
    let cart = null
    try {
        const response = await httpClient('/api/carts','POST')

        if (!response.ok) {
            throw new Error('Failed create a cart');
        }
        cart = await response.json()
        localStorage.setItem('cart', JSON.stringify(cart));

        return(cart)
    } catch (error) {

    }
}

button.addEventListener('click',async()=>{
    let cartData = JSON.parse(localStorage.getItem('cart'))
    if (!cartData){
        cartData = await createCart()
    }else{

    }
    await addProduct(cartData._id,payload._id)

})



