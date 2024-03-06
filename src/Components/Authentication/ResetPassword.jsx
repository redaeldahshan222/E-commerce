import ResetCss from "./ForgetPassword.module.css";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import React, { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/LoggedAuthProvider/LoggedAuthProvider";

export default function ResetPassword() {

const [isSeccess, setIsSeccess] = useState(null);
const [errorMeaasge, setErrorMeaasge] = useState(null);
const [isLoading, setIsLoading] = useState(null);
const navigate = useNavigate();
const {token, setToken} = useContext(authContext);

async function sendresetPasswordData(resetPasswordData) {
    try {
    const response = await axios.put(
    // await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        resetPasswordData
    );
    
    // console.log("in case of success ", response?.data);
    setIsSeccess(true);
    setToken(response?.data.token);
    // localStorage.setItem("newToken",response?.data.token)
    localStorage.setItem("newToken",token)
    setTimeout(() => {
        setIsSeccess(false);
        navigate("/login");
    }, 2000);
    setIsLoading(false);
    } catch (error) {
    // console.log("in case of errors ", error?.response.data.message);
    setErrorMeaasge(error?.response.data.message);
    setTimeout(() => {
        setErrorMeaasge(false);
    }, 2000);
    setIsLoading(false);
    }
}

let initialValues = {
    email: "",
    newPassword: "",
};

let userSchema = object({
    email: string().required(
    "You Must Enter Valid Email ; Example : example@abc.abc"
    ),
    newPassword: string()
    .required("You Must Enter The Correct Password That is More Than 6 Char").matches(/^[A-Za-z0-9]{6,20}$/, { message: "Enter Correct Password" }),
});

const forgetFormik = useFormik({
    initialValues: initialValues,
    onSubmit: Submit,
    validationSchema: userSchema,
});

async function Submit(values) {
    // data are valid to sent to backend
    setIsLoading(true);
    // console.log("logged ....", values);
    sendresetPasswordData(values);
}

return (
    <>
    <div className="w-75 m-auto py-5">
        <h2>reset your account password : </h2>

        {isSeccess ? (
        <div className="alert alert-success text-center fw-bold h4">
                Password Updated Successfully
            </div>
        ) : (
        ""
        )}
        {errorMeaasge ? (
        <div className="alert alert-danger text-center fw-bold h4">
            {errorMeaasge}
        </div>
        ) : (
        ""
        )}

        <form
        onSubmit={forgetFormik.handleSubmit}
        className="d-flex flex-column"
        >
        <label htmlFor="email">email :</label>
        <input
            className="my-2 form-control "
            value={forgetFormik.values.email}
            onInput={forgetFormik.handleBlur}
            onChange={forgetFormik.handleChange}
            id="email"
            type="email"
            placeholder="Enter Your Email ..."
        />
        {forgetFormik.errors.email && forgetFormik.touched.email ? (
            <div className="alert alert-danger w-100">
            {forgetFormik.errors.email}
            </div>
        ) : (
            ""
        )}
        
        <label htmlFor="newPassword">password :</label>
        <input
            className="my-2 form-control"
            value={forgetFormik.values.newPassword}
            onInput={forgetFormik.handleBlur}
            onChange={forgetFormik.handleChange}
            id="newPassword"
            type="password"
            placeholder="Enter Your Password ..."
        />
        {forgetFormik.errors.newPassword && forgetFormik.touched.newPassword ? (
            <div className="alert alert-danger w-100">
            {forgetFormik.errors.newPassword}
            </div>
        ) : (
            ""
        )}
        <div className="forget d-flex  justify-content-between my-3">
            <button className="btn btn-success py-2 px-4" type="submit">
            {isLoading ? (
                <RotatingLines
                visible={true}
                height="66"
                width="66"
                strokeColor="white"
                color="grey"
                strokeWidth="3"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            ) : (
                "Reset Password"
            )}
            </button>
        </div>
        </form>
    </div>
    </>
);
}
