import { object, string } from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
const [isSeccess, setIsSeccess] = useState(null);
const [errorMeaasge, setErrorMeaasge] = useState(null);
const [isLoading, setIsLoading] = useState(null);
const navigate = useNavigate();

async function sendForgetUserData(forgetUserData) {
    try {
    // const response = await axios.post(
    await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        forgetUserData
    );

    // console.log("in case of success ", response?.data);
    setIsSeccess(true);
    setTimeout(() => {
        setIsSeccess(false);
        navigate("/verify");
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
};

let userSchema = object({
    email: string().required(
    "You Must Enter Valid Email ; Example : example@abc.abc"
    ),
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
    sendForgetUserData(values);
}

return (
    <>
    <div className="w-75 m-auto py-5">
        <h2>Forget Password : </h2>

        {isSeccess ? (
        <div className="alert alert-success text-center fw-bold h4">
            Email Sent Successfully
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
        <button style={{width:"150px"}} className="btn btn-success py-2 px-4" type="submit">
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
            "Send"
            )}
        </button>{" "}
        </form>
    </div>
    </>
);
}
