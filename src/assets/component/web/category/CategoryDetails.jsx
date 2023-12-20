import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom';
import './categoryDetails.css'
import Loeader from '../loader/Loeader';

export default function CategoryDetails() {
    const {categoryId} = useParams();

    const getCategoryDetails = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
        return data.products
        // console.log(data)
    }
    const {data, isLoading} = useQuery('categoryDetails', getCategoryDetails)
    console.log(data)

    if(isLoading){
      return <Loeader></Loeader>
    }
  return (
    <div className='row'>
    {data?.length?data.map((ele)=>
    <div className='col-lg-4 section mt-5 ' key={ele._id}>
      
    <img src={ele.mainImage.secure_url} alt="" className='w-50 imagy'/>
    <p className='mt-3'>{ele.name}</p>
    <Link to={`/product/${ele._id}`} className='linky'>
    More Details
    </Link>
    </div>
    ):'no data found'}
    </div>
  )
}
