import React, { useContext } from 'react'
import { CartContext } from '../context/Cart'

export default function Orders() {
    const {getOrder, setOrder, order} = useContext(CartContext)
    console.log(order)


  return (
    <>
    <div className='fw-bold py-4'>Orders</div>
    <h5>Final Price : {order.finalPrice}</h5>
    <h5>Address : {order.adress}</h5>
    </>
  )
}
