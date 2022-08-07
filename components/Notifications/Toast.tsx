import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toast = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
  )
}

export default Toast