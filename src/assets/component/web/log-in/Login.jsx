import React, { useContext } from 'react'
import Input from '../../pages/Input'

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/validation.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';

export default function Login() {

    let navigate = useNavigate();
let {userToken ,setUserToken} = useContext(UserContext)
  
if(userToken){
    navigate(-1)
}

const initialValues ={   
    email: '',
    password: '',
}

const onSubmit= async users=>{
    console.log(users)
    const {data}= await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`, users)
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
        <div className='row'>
      <div className='col-md-4'>
        <form onSubmit={formik.handleSubmit}  className='formy'> 
        <h2 className='text-center mt-5'>Log in</h2>
            
        {renderInput}
    
        <input type="submit" value='Log in' className='sign-in' disabled={!formik.isValid}/>
        <p><Link to='/sendcode'>Forget password?</Link></p>
        </form> 
        </div>
         <div className='col-md-4 colors'>

        </div>
        </div>
)}
        
    
