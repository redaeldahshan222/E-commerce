import React from 'react'
import { ThreeCircles } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="vh-100 d-flex justify-content-center bg-primary bg-opacity-50 align-items-center">
        <ThreeCircles
            visible={true}
            height="150"
            width="150"
            color="#09c"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>
    );
}
