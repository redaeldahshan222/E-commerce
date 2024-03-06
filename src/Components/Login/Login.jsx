import LoginCss from "./Login.module.css";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/LoggedAuthProvider/LoggedAuthProvider";
import { Helmet } from "react-helmet";
import { cartAuthContext } from "../../Context/CartAuthProvider/CartAuthProvider";

export default function Login() {
  useEffect(() => {
  
    <Helmet>
    <meta charSet="utf-8" />
    <title>Login</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
},[])
  const [isSeccess, setIsSeccess] = useState(null);
  const [errorMeaasge, setErrorMeaasge] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const { setToken,name } = useContext(authContext);
  const { getProductDetails, getLoggedUserWishlist } =
    useContext(cartAuthContext);
  
  function showPassword() {
    document
      .querySelector(".toggleEye")
      .classList.toggle("fa-eye", "fa-eye-slash");
    document.querySelector(".passwordInput").removeAttribute("type");
  }

  async function sendLoginUserData(loginUserData) {
    try {
      const response = await axios.post(
        // await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        loginUserData
      );

      // console.log("in case of success ", response?.data);
      setIsSeccess(true);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      // console.log(response.data.token);
      getProductDetails();
      getLoggedUserWishlist();
      setTimeout(() => {
        setIsSeccess(false);
        navigate("/home");
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
    password: "",
  };

  let userSchema = object({
    email: string().required(
      "You Must Enter Valid Email ; Example : example@abc.abc"
    ),
    password: string()
      .required("You Must Enter The Correct Password That is More Than 6 Char")
      .matches(/^[A-Za-z0-9]{6,20}$/, { message: "Enter Correct Password" }),
  });

  const loginFormik = useFormik({
    initialValues: initialValues,
    onSubmit: Submit,
    validationSchema: userSchema,
  });

  async function Submit(values) {
    // data are valid to sent to backend
    setIsLoading(true);
    // console.log("logged ....", values);
    sendLoginUserData(values);
  }

  return (
    <>
        <div className="w-75 m-auto py-5">
          <h2>Login Now : </h2>

          {isSeccess ? (
            <div className="alert alert-success text-center fw-bold h4">
              Welcome Back User
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
            onSubmit={loginFormik.handleSubmit}
            className="d-flex flex-column"
          >
            <label htmlFor="email">email :</label>
            <input
              className="my-2 form-control "
              value={loginFormik.values.email}
              onInput={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              id="email"
              type="email"
              placeholder="Enter Your Email ..."
            />
            {loginFormik.errors.email && loginFormik.touched.email ? (
              <div className="alert alert-danger w-100">
                {loginFormik.errors.email}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="password">password :</label>
            <div className="position-relative w-100 h-25">
              <input
                className="my-2 form-control passwordInput"
                value={loginFormik.values.password}
                onInput={loginFormik.handleBlur}
                onChange={loginFormik.handleChange}
                id="password"
                type="password"
                placeholder="Enter Your Password ..."
              />
              <button
                type="button"
                onClick={showPassword}
                className="border-0 bg-transparent eye"
              >
                <i className="fa-solid fa-eye-slash toggleEye"></i>
              </button>
            </div>
            {loginFormik.errors.password && loginFormik.touched.password ? (
              <div className="alert alert-danger w-100">
                {loginFormik.errors.password}
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
                  "Login"
                )}
              </button>
              <Link className={LoginCss.reset} to="/forget">
                Forget Password
              </Link>
            </div>
          </form>
        </div>

        <div className="userModal"></div>
    </>
  );
}
