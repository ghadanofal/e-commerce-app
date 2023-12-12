import React, { useContext } from 'react'
import Input from '../../pages/Input'

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/validation.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import { CartContext } from '../context/Cart.jsx';

export default function CreateOrder() {

    let navigate = useNavigate();
let {userToken ,setUserToken} = useContext(UserContext)
let {getOrder, order, createOrder} = useContext(CartContext)
console.log(order)
  

if(userToken){
    navigate(-1)
}

const initialValues ={   
    couponName: '',
    address: '',
    phone: '',
}

const onSubmit= async orders=>{
    console.log(prders)
    const {data}= await axios.post(`https://ecommerce-node4.vercel.app/order`, orders)
    console.log(data)

    if(data.message=='success'){
        localStorage.setItem("userToken", data.token)
        setUserToken(data.token)

        formik.resetForm();
        toast.success('your sign-in is successfuly', {
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
        //validationSchema:LoginSchema,
        
    });
// console.log(formik.values)
// console.log(formik)

//dynamic input
    const inputs = [
        
        {
            id: 'couponName',
            type: 'text',
            name : 'couponName',
            title: 'user couponName',
            placeholder: 'couponName',
            value: formik.values.couponName,
        },
        {
            id: 'address',
            type: 'number',
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
        
        <form onSubmit={formik.handleSubmit}  className='formy'> 
        <h2 className='text-center mt-5'>Create Order</h2>
            
        {renderInput}
    
        <input type="submit" value='confirm value' className='sign-in' disabled={!formik.isValid}/>
        {/* <p><Link to='/sendcode'>Forget password?</Link></p> */}
        </form>
        </>
)}
        
    


