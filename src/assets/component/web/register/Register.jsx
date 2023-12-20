import React from 'react'
import Input from '../../pages/Input'
import './register.css'
import { useFormik } from 'formik';
import { registerSchema } from '../validation/validation.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function Register() {

const initialValues ={
    userName: '',
    email: '',
    password: '',
    image: '',
    
}
const HandleFieldChange = (event)=>{
console.log("test")
console.log(event)
formik.setFieldValue("image", event.target.files[0])

} 

const onSubmit= async users=>{
    console.log(users)

    const formData = new FormData();
    formData.append("userName", users.userName)
    formData.append("email",users.email)
    formData.append("password",users.password)
    formData.append("image", users.image)

    const {data}= await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`, formData)
    console.log(data)
    if(data.message=='success'){
        formik.resetForm();
        toast.success('account created successfuly, please verify your email', {
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

}


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:registerSchema,
        
    });
// console.log(formik.values)
console.log(formik)

//dynamic input
    const inputs = [
        {
            id: 'username',
            type: 'text',
            name : 'userName',
            title: 'user name',
            placeholder: 'User Name',
            value: formik.values.userName,
        },
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
            id: 'image',
            type: 'file',
            name : 'image',
            title: 'user image',
            placeholder: 'image',
            onChange: HandleFieldChange
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
        onchange={ele.onChange || formik.handleChange } 
        touched={formik.touched}
        onBlur={formik.handleBlur}
        key={index}/>
    )
    return (
    <>
    
          {/* <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className='formy'> 
    <h2 className='text-center mt-5'>Sign up</h2>
        
    {renderInput}

    <input type="submit" value='sign in' className='sign-in' disabled={!formik.isValid}/>
    </form>   */}



       
       
       
       <div className="containers">
	<div className="screen">
		<div className="screen__content">
			
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className='formy login'> 
    <h2 className='text-center  button__text'>Sign Up</h2>
    <div className="login__field my-2">   
    {renderInput}
    </div>
    
    <div className='login__submit'>
       <input type="submit" value='' className='sign-in button button__text' disabled={!formik.isValid}/>
       Sign Up
    <FaChevronRight className='button__icon fas fa-chevron-right' /> 
    </div>

   
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
    
    
    )
}
