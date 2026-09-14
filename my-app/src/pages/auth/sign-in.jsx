import React from 'react'



const SignIn = () => {
  return (
    <div className='bg-gray-900 text-white flex flex-col items-center justify-center min-h-screen gap-4'>
      <label htmlFor="signin-field">Sign In Field</label>
      <input id="signin-field" placeholder="signin field" className="rounded-3xl px-4 py-3 bg-gray-800"/>
      <button className='bg-blue-600 px-6 py-3 rounded-3xl hover:bg-blue-700 transition-colors'>
        Sign In
      </button>
    </div>
  )
}

export default SignIn