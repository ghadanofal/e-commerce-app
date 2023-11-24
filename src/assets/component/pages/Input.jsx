import React from 'react'
import './input.css'

export default function Input({type={text}, id, name, title, value, errors, placeholder, onchange, touched,onBlur }) {
  return (
    <>
    <div className='row justify-content-center align-items-center'>
    <div className="input col-md-12 soso">
        {/* <label htmlFor={id} className=''>{title}</label> */}
        <input type={type} id={id} name={name} className='form-control' placeholder={placeholder} onBlur={onBlur} title={title} value={value}  onChange={onchange} />
        {touched[name] && errors[name] &&<p className='text-danger'>{errors[name]}</p>}
    </div>
    </div>
    </>
  )
}
