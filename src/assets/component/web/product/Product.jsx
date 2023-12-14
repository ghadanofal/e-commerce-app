import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import './product.css'

export default function Product() {
    const {productId} = useParams();
    //console.log(productId)
    const {addToCartContext} = useContext(CartContext)

    const getProduct = async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
      return data.product
      // console.log(data)
  }
  const {data, isLoading} = useQuery('getProduct', getProduct)
  //console.log(data)



  const addToCart = async (productId)=>{
    const res = await addToCartContext(productId)
    console.log(res)
  }

  if(isLoading){
      return <h2>loading...</h2>
  }
    
  return (
    <div className='container'>
     <div className='row mt-5'>
      <div className='col-md-6'>
      <img src={data.mainImage.secure_url } className='w-75 imagy'/>
      </div>
      <div className='col-md-6 product-details'>

       <h3>{data.name}</h3>
       <p><span>price : </span>{data.price}$</p>
       <p><span>finalPrice: </span>{data.finalPrice}$</p>
       <p className=' '>{data.description}</p>
      
       <button className='btn add' onClick={()=>addToCart(data._id)}>ADD TO CARD</button>
       </div>
</div> 
    </div>
  )
}
