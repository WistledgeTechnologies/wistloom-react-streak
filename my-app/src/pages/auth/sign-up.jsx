<<<<<<< HEAD
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "@/components/forms/TextInput";

// STANDARD REACT FORM PATTERN:
// 1. One state object holds all input values (formData)
// 2. Each input is CONTROLLED: value={formData.name} + onChange updates state
// 3. validate() returns an errors object
// 4. onSubmit calls e.preventDefault() so the page does NOT reload
const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Runs on every keystroke. Uses input's `name` to update the right field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live re-validate a field once the user has touched it
    if (touched[name]) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  // Marks a field as "visited" so we only show its error after blur/submit
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  // Pure function: input -> errors. Easy to test, easy to teach.
  const validate = (values = formData) => {
    const nextErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    } else if (values.fullName.trim().length < 3) {
      nextErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // <-- stops the browser's default page reload

    const validationErrors = validate();
    setErrors(validationErrors);
    // Mark everything touched so all errors appear on a bad submit
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true });

    if (!agreed) {
      return; // checkbox error is shown inline below
    }

    if (Object.keys(validationErrors).length > 0) {
      return; // stop: fix errors first
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    // Fake API call: setTimeout stands in for fetch/axios
    setTimeout(() => {
      const newUser = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        isLoggedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      setIsSubmitting(false);
      setSuccessMessage(`Account created for ${newUser.email}! Redirecting...`);
      setFormData(initialForm);
      setTouched({});
      setAgreed(false);

      setTimeout(() => navigate("/dashboard"), 1200);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold text-foreground">Create account</h1>
      <p className="mt-1 text-sm text-muted">
        Fill the form below. All inputs are controlled by React state.
      </p>

      {successMessage && (
        <p className="mt-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <TextInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName ? errors.fullName : ""}
          placeholder="Ada Lovelace"
          autoComplete="name"
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ""}
          placeholder="ada@example.com"
          autoComplete="email"
        />

        <TextInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ""}
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="text-xs font-semibold text-blue-500 hover:text-blue-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        <TextInput
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : ""}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 accent-blue-600"
          />
          <span>I agree to the Terms and Privacy Policy</span>
        </label>
        {!agreed && touched.fullName && (
          <p className="-mt-2 text-xs text-red-500">
            You must agree before creating an account.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
=======

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
>>>>>>> 1aa0f2299e182add3a7752134ed875409dda4f40
