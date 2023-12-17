import React, { useContext } from 'react'
import Input from '../../pages/Input'

import { useFormik } from 'formik';
import { CreateOrderSchema, LoginSchema } from '../validation/validation.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import { CartContext } from '../context/Cart.jsx';
import { useQuery } from 'react-query';

export default function CreateOrder() {

    let navigate = useNavigate();
    let {userToken ,setUserToken} = useContext(UserContext)
  
const {getCartContext,decreaseQuantity, increaseQuantity, removeAll,removeCartContext}= useContext(CartContext)
  const {count, setCount}= useContext(CartContext)



// console.log(Loading)
  const getCard = async ()=>{
    const res = await getCartContext()
    //console.log(res)

    //return (cartData)
    return res 
    //console.log(res)
  }
 


const removeCartItem = async(productId)=>{
  
  const res = await removeCartContext(productId)
 
  return res
}

const increase = async(productId)=>{
  const res = await increaseQuantity(productId);
  return res
}

const decrease = async(productId)=>{
  const res = await decreaseQuantity(productId);
  return res
}

const clear = async()=>{
  const res = await removeAll();
  return res
}

const {data, isLoading} = useQuery('getCard', getCard, decrease,increase, clear ,removeCartItem )
// console.log(data)

const initialValues ={   
    couponName: '',
    address: '',
    phone: '',
}

const onSubmit= async (users)=>{
    console.log(users)
    console.log(userToken)
    const {data}= await axios.post(`https://ecommerce-node4.vercel.app/order`,
    {
        couponName: users.couponName,
        address: users.address,
        phone: users.phone,
      },
     
    {headers : {Authorization: `Tariq__${userToken}`}}
    )
    console.log(data)

    if(data.message=='success'){
      localStorage.setItem("userToken", userToken)
      setUserToken(userToken)
        formik.resetForm();
        toast.success('Order created  successfuly', {
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
    navigate('/')

}


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: CreateOrderSchema,
        
    });
// console.log(formik.values)
// console.log(formik)

//dynamic input
    const inputs = [
        
       
        {
            id: 'address',
            type: 'text',
            name : 'address',
            title: 'user address',
            placeholder: 'address',
            value: formik.values.address,
        },
        {
            id: 'phone',
            type: 'number',
            name : 'phone',
            title: 'user phone',
            placeholder: 'phone',
            value: formik.values.phone,
        },
        {
          id: 'couponName',
          type: 'text',
          name : 'couponName',
          title: 'user couponName',
          placeholder: 'couponName',
          value: formik.values.couponName,
      }
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

    return (
        <>
      {/* <form onSubmit={formik.handleSubmit}  className='form col-md-4'> 
        <h2 className='text-center mt-5'>Create order</h2>
            
        {renderInput}
    
        <input type="submit" value='create order' className='sign-in' disabled={!formik.isValid}/>
        </form> */}
        
    <div className="cart">
    <div className="container">
      <div className="row">
        <div className="cart-items">
          <div className="products" id="products">
             <h3 className='text-center title m-4'>Complete your order</h3>
            <div className="item">
             
              <div className="product-info">
                <h2>Product</h2>
              </div>
              <div className="quantity">
                <h2>Quantity</h2>
              </div>
              <div className="price">
                <h2>Price</h2>
              </div>
              <div className="subtotal">
                <h2>Subtotal</h2>
              </div>
            </div>



            {data?.products?(
              data?.products.map((ele)=>
            <div className="item" key={ele._id}>
              <div className="product-info">
                <img src={ele.details.mainImage.secure_url} />
                <div className="product-details">
                  <h2>{ele.details.name}</h2>
                  <span>{ele.details.colors}</span>
                  {/* <a href="#" onClick={()=>removeCartItem(ele.details._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={25}
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z"
                        fill="#6C7275"
                      />
                    </svg>
                    remove
                  </a> */}
                </div>
              </div>
              <div className="quantity">
                {/* <button onClick={()=>decrease(ele.details._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={17}
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M3.22852 8.5H12.5618"
                      stroke="#121212"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button> */}
                <span>{ele.quantity}</span>
                {/* <button onClick={()=>increase(ele.details._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={17}
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
                      fill="#121212"
                    />
                  </svg>
                </button> */}
              </div>
              <div className="price">{ele.details.finalPrice}</div>
              <div className="subtotal">${ele.quantity * ele.details.finalPrice}</div>
            </div>
              )
            ): <h2>cart is empty</h2>}
           


           

          </div>
         
        </div>
        {/* <button onClick={()=>clear()} className='w-25 btn btn-warning rounded-1'>clear all cart</button> */}
        <form onSubmit={formik.handleSubmit}  className='form col-md-4'> 
        <h2 className='text-center mt-5'>Create order</h2>
            
        {renderInput}
    
        <input type="submit" value='create order' className='sign-in' disabled={!formik.isValid}/>
        </form>
      </div>
    </div>
  </div>
    


        
        </>
)}
                  
    
