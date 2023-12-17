import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import './product.css'
import { Rating } from 'react-simple-star-rating'
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import { UserContext } from '../context/User';



export default function Product() {
    const {productId} = useParams();
    let {userToken ,setUserToken} = useContext(UserContext)
    let navigate = useNavigate();

    const [rating, setRating] = useState(0)
   const [Reviews, setReviews] = useState([])
   const[avgReview, setAvgReview] = useState(0)

    //console.log(productId)
    const {addToCartContext} = useContext(CartContext)

    const getProduct = async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
       console.log(data)
       console.log(data.product.reviews)
       setReviews(data.product.reviews)
       
      //  console.log(data.product.ratingNumbers)
       setRating(data.product.ratingNumbers)
       return data.product
     
  }

  
  const initialValues ={   
    comment : '',
    rating : '',
}

const onSubmit= async (users)=>{
    console.log(users)
    console.log(userToken)
    try{const {data}= await axios.post(`https://ecommerce-node4.vercel.app/products/${productId}/review`,
    {
      comment: users.comment,
      rating : users.rating,
    },
     
    {headers : {Authorization: `Tariq__${userToken}`}}
    )
    console.log(data)}catch (error) {
      console.error('Error submitting review:', error);
    }

    if(data.message=='success'){
      localStorage.setItem("userToken", userToken)
      setUserToken(userToken)
        formik.resetForm();
        toast.success('review created  successfuly', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    navigate('/products')

}


    const formik = useFormik({
        initialValues,
        onSubmit,
        // validationSchema: CreateOrderSchema,
        
    });
// console.log(formik.values)
// console.log(formik)

//dynamic input
    const inputs = [
        
       
        {
            id: 'comment',
            type: 'textarea',
            name : 'comment',
            title: 'user comment',
            placeholder: 'user comment',
            value: formik.values.comment,
        },
        {
          id: 'rating',
          type: 'number',
          name : 'rating',
          title: 'your rating',
          placeholder: 'your rating',
          value: formik.values.rating,
      },
       
]



    const renderInput = inputs.map((ele,index)=>
        <Input type={ele.type} 
        id={ele.id} 
        name={ele.name}
        title={ele.title} 
        placeholder={ele.placeholder} 
        value={ele.value} 
        errors={formik.errors}
        onchange={formik.handleChange } 
        touched={formik.touched}
        onBlur={formik.handleBlur}
        key={index}/>
)





  const {data, isLoading} = useQuery('getProduct', getProduct)
  // console.log(data)

  const calculateAverageRating = () => {
    let totalRating = 0;
    let average = 0.0;
    Reviews.map((ele)=>{
      console.log(ele.rating)
      totalRating+= ele.rating;
      // console.log(totalRating)
      // setAvg(totalRating);
    }) 
     average = Reviews.length > 0 ? totalRating / Reviews.length : 0;
      console.log(average)
      setAvgReview(average) 
  }


    useEffect(() => {
      calculateAverageRating();
    }, [Reviews]);

  const addToCart = async (productId)=>{
    const res = await addToCartContext(productId)
    console.log(res)
  }



  if(isLoading){
      return <h2>loading...</h2>
  }
  


  return (
    <div className='container'>
     <div className='row my-5'>
      <div className='col-md-6'>
      <img src={data.mainImage.secure_url } className='w-75 imagy'/>
      </div>
      <div className='col-md-6 product-details'>

       <h3>{data.name}</h3>
       <p><span>price : </span>{data.price}$</p>
       <p><span>finalPrice: </span>{data.finalPrice}$</p>

        <div>
        {Array.from({ length: Math.floor(avgReview) }).map((ele) => (
        <span className='checked'>&#9733;</span>
        ))}

        {Array.from({ length: 5- Math.floor( avgReview) }).map((ele) => (
        <span className='non-checked'>&#9733;</span>
        ))}</div>


          {/* {Review.map((ele)=>(
            <>
            <h2>{ele.rating}</h2>
            </>
          ))} */}
        {Reviews.map((ele)=>{
  <p>{ele.rating}</p>
 })}

        <h2>{avgReview.toFixed(2)} out of 5 stars</h2>
       <p className=' '>{data.description}</p>
      
       <button className='btn add' onClick={()=>addToCart(data._id)}>ADD TO CARD</button>
       </div>
       
</div> 



<div className="row  ">
  <div className="col-md-3">
   <img src="/img/images.png" alt="" />
  </div>
  
  <div className="col-md-8 text-start">
 {Reviews.map((ele)=>
  <> 
  <div>
  <span className='fs-3'>{(ele.rating)}</span>
  {Array.from({ length: Math.floor(ele.rating) }).map((ele) => (
        <span className='checked'>&#9733;</span>
        ))}
        {Array.from({ length: 5- Math.floor( ele.rating) }).map((ele) => (
        <span className='non-checked'>&#9733;</span>
        ))}
</div>
  <p className=''>{(ele.comment)}</p>
   
  </>
 )}</div>
</div>

<form onSubmit={formik.handleSubmit}  className='form col-md-4'> 
        <h2 className='text-center mt-5'>your reviews</h2>
            
        {renderInput}
    
        <input type="submit" value='submite review' className='sign-in' disabled={!formik.isValid}/>
        </form>

    </div>
  )
          }

