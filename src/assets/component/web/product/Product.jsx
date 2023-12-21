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
import { FaChevronRight } from "react-icons/fa6";
import Loeader from '../loader/Loeader';




export default function Product() {
    const {productId} = useParams();
    let {userToken ,setUserToken} = useContext(UserContext)
    let navigate = useNavigate();

    const [rating, setRating] = useState(0)
   const [Reviews, setReviews] = useState([])
   const[avgReview, setAvgReview] = useState(0)
   const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Number of reviews to show per page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = Reviews.slice(indexOfFirstReview, indexOfLastReview);

    //console.log(productId)
    const {addToCartContext} = useContext(CartContext)

    const getProduct = async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
       console.log(data)
       console.log(data.product)
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
        toast.success('your comment is publish', {
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
    return <Loeader></Loeader>
  }
  


  

  const renderReviews = currentReviews.map((ele) => (
    <>

<div className="reviewSection col-md-4">
  <div className="reviewItem">
    <div className="top">
      <div className="clientImage">
        <img src={(ele.createdBy.image.secure_url)} alt />
        <span>{ele.createdBy.userName}</span>
      </div>
    </div>
    
    <article className='ms-5'>
    <div className="comment">
    {Array.from({ length: Math.floor(ele.rating) }).map((ele) => (
        <span className='checked fs-4'>&#9733;</span>
        ))}
        {Array.from({ length: 5- Math.floor( ele.rating) }).map((ele) => (
        <span className='non-checked fs-4'>&#9733;</span>
        ))}
        </div>
      <p className="review">{ele.comment}</p>
      {/* <p>{ele.createdBy.createdAt}</p> */}
    </article>
  </div>
</div>

</>
  ));


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Reviews.length / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={currentPage === number ? 'current-page' : 'pagination-link'}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ))
  

  return (
    <div className='container'>
     <div className='row my-5'>
      <div className='col-md-5'>
        <div className="gellary">
        <img src={data.mainImage.secure_url } className='w-100'/>
        </div>
      </div>
      <div className='col-md-7 details px-5'>

       <h1 className='fs-3'>{data.name}</h1>
       <h2 className='price'>{data.price}$</h2>
       <h3>{data.discount} OFF</h3>
       {/* <p><span>finalPrice: </span>{data.finalPrice}$</p> */}

        <div>
        {Array.from({ length: Math.floor(avgReview) }).map((ele) => (
        <span className='checked'>&#9733;</span>
        ))}

        {Array.from({ length: 5- Math.floor( avgReview) }).map((ele) => (
        <span className='non-checked'>&#9733;</span>
        ))}</div>


        {Reviews.map((ele)=>{
  <p>{ele.rating}</p>
 })}

        <h2 className='rate'>{avgReview.toFixed(2)} out of 5 stars</h2>
       <p className='description '>{data.description}</p>
      
      <div className="product-price ">
      {/* <p className='price'>{data.finalPrice}$</p> */}
      <button className='btn add mt-4 ' onClick={()=>addToCart(data._id)}>ADD TO CARD</button>

      </div>
       </div>
       
</div> 






{/* ============= */}

<div class='row  mt-5'>
        <div className='text-center'>
          <h2 className='mt-5'> Customer reviews </h2>
          <h2 class='description fs-5'>Our customer review</h2>
        </div>
        <>
          {renderReviews}
          <ul id='page-numbers' className='d-flex justify-content-center align-items-center'>{renderPageNumbers}</ul>
        </>
      </div>

{/* ============ */}



{/* 
<form onSubmit={formik.handleSubmit}  className='form col-md-4'> 
        <h2 className='text-center mt-5'>Review And rating</h2>
        <h2 className='text-center fs-6'>How was your experience about our product?</h2>
            
        {renderInput}
    
        <input type="submit" value='submite review' className='sign-in' disabled={!formik.isValid}/>
        </form> */}

<div className="d-flex justify-content-center align-items-center">
	<div className="scree">
		<div className="screen__content">
			
            <form onSubmit={formik.handleSubmit}  className='formy login pt-0'> 
            <h2 className='text-center mt-5'>Review And rating</h2>
        <h2 className='text-center fs-6'>How was your experience about our product?</h2>
        
    <div className="login__field my-2  ">   
    {renderInput}
    </div>
    
    <div className='login__submit'>
       <input type="submit" value='submit review' className='sign-in button button__text' disabled={!formik.isValid}/>
       
    <FaChevronRight className='button__icon fas fa-chevron-right review-icon' /> 
    </div>
    
    </form>  
		</div>
	</div>
</div> 
    

    </div>



  )
          }

