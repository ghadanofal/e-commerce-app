import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart';

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
      <img src={data.mainImage.secure_url } className='w-75'/>
      </div>
      <div className='col-md-6'>

       <p><span>Name of product :</span>{data.name}</p>
       <p className=' '><span>More detials :</span>{data.description}</p>
       <p><span>price :</span>price :{data.price}</p>
       <p><span>price :</span>price :{data.price}</p>
       <p><span>finalPrice:</span>{data.finalPrice}</p>
       <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>Add to card</button>
       </div>
</div> 
    </div>
  )
}
