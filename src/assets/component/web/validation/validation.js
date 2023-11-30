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