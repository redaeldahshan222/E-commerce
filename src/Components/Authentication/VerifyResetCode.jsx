import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyResetCode() {
    const [isSeccess, setIsSeccess] = useState(null);
const [errorMeaasge, setErrorMeaasge] = useState(null);
const [isLoading, setIsLoading] = useState(null);
const navigate = useNavigate();

    async function sendverifyResetCode(verifyResetCode) {
        try {
        let response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
            verifyResetCode
        );
    
        // console.log("in case of success ", response?.data);
        setIsSeccess(true);
        setTimeout(() => {
            setIsSeccess(false);
            navigate("/reset");
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
        resetCode: "",
    };
    
    let userSchema = object({
        resetCode: string().required(
            "Enter Reset 'Number' Code ... "
        ),
    });
    
    const verifyResetCodeFormik = useFormik({
        initialValues: initialValues,
        onSubmit: Submit,
        validationSchema: userSchema,
    });
    
    async function Submit(values) {
        // data are valid to sent to backend
        setIsLoading(true);
        // console.log("logged ....", values);
        sendverifyResetCode(values);
    }

    return (
        <>
        <div className="w-75 m-auto py-5">
        <h2>reset your account password : </h2>
            {isSeccess ? (
            <div className="alert alert-success text-center fw-bold h4">
                Reset Code Sent Successfully
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
            onSubmit={verifyResetCodeFormik.handleSubmit}
            className="d-flex flex-column"
            >
            <label htmlFor="resetCode">reset your account password : </label>
            <input
            className="my-2 form-control "
            value={verifyResetCodeFormik.values.resetCode}
            onInput={verifyResetCodeFormik.handleBlur}
            onChange={verifyResetCodeFormik.handleChange}
            id="resetCode"
            type="text"
            placeholder="Code ..."
            />
            {verifyResetCodeFormik.errors.resetCode && verifyResetCodeFormik.touched.resetCode ? (
            <div className="alert alert-danger w-100">
                {verifyResetCodeFormik.errors.resetCode}
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
                "Verify"
                )}
            </button>
            </form>
        </div>
        </>
    );
}
