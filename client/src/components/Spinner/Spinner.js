import React from 'react'
import './Spinner.css'
import logo from './loading3.gif'
export default function Spinner() {
  return (
    <>
        <div className="container text-center">
            <img src={logo} style={{width:"40px"}} alt="" />
        </div> 
    </>
  )
}
