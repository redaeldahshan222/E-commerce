import ResetCss from "./Reset.module.css"
import { object, string } from 'yup';
import { useFormik } from "formik";
import React, { useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Reset() {
    useEffect(() => {
        
    <Helmet>
    <meta charSet="utf-8" />
    <title>Reset</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
</Helmet>
    },[])
async function sendResetUserData(resetUserData){
    try{
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,resetUserData)
    // console.log('reset success',response.data.message);
    }
    catch(error){
    // console.log('reset error',error.response.data.message);
    }
}
let initialValues={
    email:'',
};

let userSchema = object({
    email:      string().required('You Must Enter Valid Email ; Example : example@abc.abc'),
});

const resetFormik = useFormik({
    initialValues:initialValues,
    onSubmit:Submit,
    validationSchema:userSchema,
    
})

function Submit(values){
    // console.log("reset Successfully ....",values);
    sendResetUserData(values);
}

return<>
<div className="w-75 m-auto py-5">
    <h2>Reset Password : </h2>

    <form onSubmit={resetFormik.handleSubmit} className="d-flex flex-column">
    <label htmlFor="email">email :</label>
    <input className="my-2 form-control " value={resetFormik.values.email}  onInput={resetFormik.handleBlur} onChange={resetFormik.handleChange} id="email" type="email" placeholder="Enter Your Email ..." />
    <div className="forget d-flex  justify-content-between my-3">
        <Link className={ResetCss.reset} to="/login">Login</Link>
        <Link className={ResetCss.reset} to="/register">Register</Link>
    </div>
        <button className="btn btn-success" type="submit">Reset</button>
    </form>
        </div>
</>
}
