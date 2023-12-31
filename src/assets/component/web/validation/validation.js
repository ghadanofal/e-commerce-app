import * as yup from 'yup'

export const registerSchema = yup.object({
    userName: yup.string().required("name is required").min(3,"at least 3 character").max(40, "max 40 character") ,
    email: yup.string().required("email is required").email(),
    password: yup.string().required("password is required").min(4,"at least 4 character").max(19, "max 19 character") ,
})

export const LoginSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password: yup.string().required("password is required").min(4,"at least 4 character").max(19, "max 19 character") ,
})





export const ForgetSchema = yup.object().shape({
 email: yup.string().email('Invalid email address').required('Required'),
});

export const CodeSchema = yup.object({
    password: yup.string().required("password is required").min(4,"at least 4 character").max(19, "max 19 character") ,
})

export const CreateOrderSchema = yup.object({
    // couponName: yup.string().required("name is required").length(4) ,
    address: yup.string().required("address is required"),
    phone: yup.string().required("phone is required") ,
})
