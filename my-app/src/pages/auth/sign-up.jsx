
import { useRef, useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState(
    { 
        fullName: "", 
        email: "", 
        password: "", 
        confirmPassword: "" 
    })
     

    const handleChange = (event) => {
         const { name, value } = event.target
         setFormData((prev) => ({...prev, [name] : value}))
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Signed up successfully", formData)
    }
     

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">

        <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Register now</h1>
        </div>

        <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="fullname" className="text-sm font-medium text-foreground">FullName</label>
            <input 
            id="fullname" 
            name="fullName" type="text" 
            onChange={handleChange}
            value={formData.fullName}
            placeholder="enter your first name" 
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"/>
        </div>

        <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input 
            id="email" 
            type="email" 
            name="email" 
            onChange={handleChange} 
            value={formData.email}
            placeholder="signup field" 
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"/>
        </div>

        <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <input id="password" name="password" type="password" onChange={handleChange}
            value={formData.password} placeholder="signup field" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"/>
        </div>

        <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Confirm Password</label>
            <input id="password" name="confirmPassword" type="password" onChange={handleChange} 
            value={formData.confirmPassword} placeholder="repeat your password" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"/>
        </div>

        <div className="flex w-full flex-col pt-2">
            <button type="submit" className="w-full rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-[0.98]">
            Sign Up
            </button>
        </div>
    </form>
    </div>
  )
}

export default SignUp