import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex justify-center items-center min-h-screen mt-20'>
      {children}
    </div>
  )
}

export default AuthLayout