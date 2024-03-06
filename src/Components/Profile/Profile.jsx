import React, { useContext } from 'react'
import { authContext } from '../../Context/LoggedAuthProvider/LoggedAuthProvider'
import { Link } from 'react-router-dom'

export default function Profile() {
  const {name} = useContext(authContext)
  return <>
    <div className="text-center d-flex align-items-center justify-content-between container py-5">
      <h1>Hello , <span className='fw-bold'>{name}</span> </h1>
      <Link className='btn btn-danger ' to='/allorders'>Check All Orders</Link>
  </div>
  </>
}
