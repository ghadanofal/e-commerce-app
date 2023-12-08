import React, { useContext } from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik';
import { LoginSchema } from '../validation/validation.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';

export default function ForgetPassword() {

    let navigate = useNavigate();
let {setUserToken} = useContext(UserContext)
   

const initialValues ={   
    email: '',
    password: '',
    code: '',
}

const onSubmit= async users=>{
    console.log(users)
    const {data}= await axios.patch(`https://ecommerce-node4.vercel.app/auth/forgotPassword`, users)
    console.log(data)

    if(data.message=='success'){
        localStorage.setItem("userToken", data.token)
        setUserToken(data.token)

        formik.resetForm();
        toast.success('your resign-in is successfuly', {
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
    navigate('/login')

}


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:LoginSchema,
        
    });
// console.log(formik.values)
// console.log(formik)

//dynamic input
    const inputs = [
        
        {
            id: 'email',
            type: 'email',
            name : 'email',
            title: 'user email',
            placeholder: 'Email',
            value: formik.values.email,
        },
        {
            id: 'password',
            type: 'password',
            name : 'password',
            title: 'user password',
            placeholder: 'Password',
            value: formik.values.password,
        },
        {
            id: 'code',
            type: 'text',
            name : 'code',
            title: 'user code',
            placeholder: 'your code',
            value: formik.values.code,
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
        <h2 className='text-center mt-5'>ReSign in</h2>
            
        {renderInput}
    
        <input type="submit" value='sign in' className='sign-in' disabled={!formik.isValid}/>
        
        </form>
        </>
)}
        
    
