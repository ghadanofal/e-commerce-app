import React, { useContext } from 'react'
import Input from '../../pages/Input'

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/validation.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import { FaChevronRight } from "react-icons/fa6";
import './log-in.css'


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
       <>
       
       
       
       <div className="containers">
	<div className="screen">
		<div className="screen__content">
			
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className='formy login'> 
    <h2 className='text-center  button__text'>Log In</h2>
    <div className="login__field my-2">   
    {renderInput}
    </div>
    
    <div className='login__submit'>
       <input type="submit" value='log in' className='sign-in button button__text' disabled={!formik.isValid}/>  
       <FaChevronRight className='button__icon fas fa-chevron-right' /> 
    </div>
    <p className='mt-5 '><Link to='/sendcode' className='forget'>Forget password?</Link></p> 
    

   
    </form>  

			
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div> 
    

    
    </>
    
)}
        
    
