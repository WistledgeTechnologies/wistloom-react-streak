import { useRef } from "react";




const SignUp = () => {


    const ref = useRef(null);

  return (
    <div className='bg-gray-900 text-white flex flex-col items-center justify-center min-h-screen gap-4'>
        <label htmlFor="signup-field">Signup Field</label>
        <input id="signup-field" placeholder="signup field" className="rounded-3xl px-4 py-3 bg-gray-800 placeholder:text-blue-900 focus:placeholder:text-gray-300"/>
        <button  className='bg-blue-600 px-6 py-3 rounded-3xl hover:bg-blue-700 transition-colors'>
            Get Started
        </button>
    </div>
  )
}

export default SignUp