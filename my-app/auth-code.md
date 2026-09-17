# Authentication — Full Working Code

All files needed for signup, signin, logout, and route protection.
Paste each file as-is, in the order shown, then run `npm run build`.

## 1. src/context/AuthContext.jsx

```jsx
import { createContext, useState } from "react";

const AuthContext = createContext();

// The one user logged in right now, or null.
const SESSION_KEY = "user";
// Every account created in this browser. An array so many users can
// each log in and out without wiping each other's account.
const ACCOUNTS_KEY = "accounts";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Turn any password into an opaque string so only a hash is ever stored.
const hashPassword = async (password) => {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const readSession = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
    return saved?.isLoggedIn ? saved : null;
  } catch {
    return null;
  }
};

const readAccounts = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readSession);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberedEmail] = useState(() => {
    try {
      return localStorage.getItem("rememberedEmail") || "";
    } catch {
      return "";
    }
  });

  const persist = (nextUser) => {
    if (nextUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    setUser(nextUser);
  };

  const run = async (task) => {
    setIsLoading(true);
    try {
      await wait(1000);
      return await task();
    } finally {
      setIsLoading(false);
    }
  };

  // Throws an Error with a UI-ready message on failure.
  // Only a registered email with the right password can log in.
  const login = ({ email, password, rememberMe = false }) => {
    return run(async () => {
      const normalizedEmail = email.trim().toLowerCase();
      const account = readAccounts().find((a) => a.email === normalizedEmail);

      if (!account) {
        throw new Error(`No account found for ${email.trim()}. Try signing up first.`);
      }

      const enteredHash = await hashPassword(password);

      if (enteredHash !== account.passwordHash) {
        throw new Error("Incorrect password. Try again.");
      }

      const loggedInUser = {
        name: account.name,
        email: account.email,
        isLoggedIn: true,
      };

      persist(loggedInUser);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loggedInUser.email);
      }

      return loggedInUser;
    });
  };

  const signup = ({ fullName, email, password }) => {
    return run(async () => {
      const name = fullName.trim();
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readAccounts();

      if (accounts.some((account) => account.email === normalizedEmail)) {
        throw new Error("An account with this email already exists. Try signing in.");
      }

      const passwordHash = await hashPassword(password);

      localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify([...accounts, { name, email: normalizedEmail, passwordHash }])
      );

      const newUser = { name, email: normalizedEmail, isLoggedIn: true };
      persist(newUser);
      return newUser;
    });
  };

  // Clears only the current session, never the accounts array,
  // so every registered user can still sign back in.
  const logout = () => {
    persist(null);
  };

  const isLoggedIn = Boolean(user?.isLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        rememberedEmail,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
```

## 2. src/hooks/useAuth.js

```jsx
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"


export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("useAuth is supposed to be within a Provider")
    }

    return context;
}
```

## 3. src/layouts/AuthLayout.jsx

```jsx
import { Link, Outlet } from "react-router-dom"
import { Briefcase, Clock, MessagesSquare } from "lucide-react"

const checklist = [
  { icon: Briefcase, text: "2X More Qualified Job Matches" },
  { icon: Clock, text: "60% Time Savings in Job Searches" },
  { icon: MessagesSquare, text: "50% More Interview Invites" },
]

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background font-auth lg:grid-cols-2">
      <div className="relative hidden flex-col overflow-hidden bg-card p-8 sm:p-12 lg:flex">
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-[34rem] w-[34rem] rounded-full bg-emerald-300/70 blur-3xl dark:bg-emerald-600/50" />
        <div className="pointer-events-none absolute -bottom-10 left-40 h-80 w-80 rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-700/40" />
        <div className="relative flex flex-col">
        <Link to="/" aria-label="Go to homepage" className="flex w-fit items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Briefcase size={16} strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-foreground">Jobright</span>
        </Link>

        <h2 className="mt-14 whitespace-nowrap text-3xl font-light leading-[1.2] text-foreground sm:text-4xl">
          Always be the <span className="font-bold">first</span>
          <br />
          to apply the <span className="font-bold">best</span> jobs.
        </h2>

        <div className="mt-8 flex flex-col gap-1 text-[15px] text-foreground">
          <p><span className="font-bold">400,000+</span> Today&apos;s new jobs</p>
          <p><span className="font-bold">8,000,000+</span> Total jobs</p>
        </div>

        <hr className="my-8 border-foreground/10" />

        <ul className="flex flex-col gap-4">
          {checklist.map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-[13px] font-medium text-foreground">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground">
                <item.icon size={14} />
              </span>
              {item.text}
            </li>
          ))}
        </ul>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-4 py-10 sm:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
```

## 4. src/components/ui/TextInput.jsx

```jsx

const TextInput = ({ label, name, type = "text", value, onChange, onBlur, onFocus, error = "", placeholder = "", autoComplete = "off", rightSlot = null, hideLabel = false }) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : "text-xs font-semibold tracking-wide text-foreground/90"}>{label}</label>
      <div className="relative">
        <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined} className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:bg-card focus:ring-2 ${error ? "border-red-500/70 ring-2 ring-red-400 focus:ring-red-400" : "border-border focus:ring-foreground/15"} ${rightSlot ? "pr-10" : ""}`} />
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && <p id={errorId} role="alert" className="text-[11px] font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
```

## 5. src/pages/auth/sign-up.jsx

```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/useAuth";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M24 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.8c-.1 1.1-.8 2.8-2.5 3.9l3.7 2.9c2.3-2.1 4-5.2 4-9z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.3 1.2-3.3 0-6.1-2.2-7.1-5.2l-3.9 3C3 21.3 7.2 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M4.9 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2l-3.9-3C.4 8.2 0 10 0 12s.4 3.8 1 5.2l3.9-3z"
    />
    <path
      fill="#EA4335"
      d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.2 0 3 2.7 1 6.8l3.9 3c1-3 3.8-5.1 7.1-5.1z"
    />
  </svg>
);

const SignUp = () => {
    const [ errors, setErrors ] = useState({})
    const navigate = useNavigate();
    const { signup, isLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(
    {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        updatesOptIn: true
    })


    const handleChange = (event) => {
         const { name, value, type, checked } = event.target
         setFormData((prev) => ({...prev, [name] : type === "checkbox" ? checked : value}))
         setErrors((prev) => {
           if (!prev[name] && !prev.submit) return prev
           const rest = { ...prev }
           delete rest[name]
           delete rest.submit
           return rest
         })
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Single place where raw input becomes clean data.
    // validate assumes it receives normalized values.
    const normalizeSignup = (values) => ({
      ...values,
      fullName: (values.fullName || "").trim(),
      email: (values.email || "").trim(),
    });

    const validate = (values) => {
      const nextErrors = {};
      if (!values.fullName) nextErrors.fullName = "Full name is required.";
      else if (values.fullName.length < 3) nextErrors.fullName = "Min. 3 characters.";
      if (!values.email) nextErrors.email = "Email is required.";
      else if (!emailRegex.test(values.email)) nextErrors.email = "Enter a valid email.";
      if (!values.password) nextErrors.password = "Password is required.";
      else {
        if (values.password.length < 6) nextErrors.password = "Min. 6 characters.";
        else if (!/[A-Za-z]/.test(values.password)) nextErrors.password = "Must include a letter.";
        else if (!/\d/.test(values.password)) nextErrors.password = "Must include a number.";
      }
      if (!values.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
      else if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Passwords do not match.";
      return nextErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const normalized = normalizeSignup(formData);
      const validationErrors = validate(normalized);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      try {
        await signup({ fullName: normalized.fullName, email: normalized.email, password: normalized.password });
        navigate("/dashboard");
      } catch (err) {
        setErrors((prev) => ({ ...prev, submit: err.message }));
      }
    };

    const handleGoogle = () => {
      setErrors((prev) => ({ ...prev, submit: "Google sign-up is not available in this demo yet." }));
    };



  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3">
        <h1 className="text-center text-xl font-bold text-foreground">Sign up To Continue Applying</h1>

        <button
          type="button"
          onClick={handleGoogle}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <div className="flex items-center gap-3 text-[11px] font-medium text-muted">
          <span className="h-px flex-1 bg-border" />
          OR
          <span className="h-px flex-1 bg-border" />
        </div>

        <TextInput
          label="Full name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Full name"
          autoComplete="name"
          hideLabel
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Email"
          autoComplete="email"
          hideLabel
          rightSlot={
            <span className="text-muted">
              <Mail size={16} />
            </span>
          }
        />

        <TextInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Password"
          autoComplete="new-password"
          hideLabel
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="rounded-md p-1 text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <TextInput
          label="Confirm password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm password"
          autoComplete="new-password"
          hideLabel
        />

        <label htmlFor="updatesOptIn" className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted">
          <input
            id="updatesOptIn"
            name="updatesOptIn"
            type="checkbox"
            checked={formData.updatesOptIn}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-emerald-500"
          />
          <span>I want to receive updates from Jobright about latest job offers</span>
        </label>

        {errors.submit && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.submit}</p>}

        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-foreground px-4 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:cursor-not-allowed disabled:opacity-70">
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-muted">
          By continuing, you agree to the Jobright{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-foreground underline underline-offset-2">Terms of Service</a>
          {" "}and the{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-foreground underline underline-offset-2">Privacy Policy</a>
        </p>

        <div className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-center text-[13px] text-muted">
          Already a member?{" "}
          <Link to="/signin" className="font-bold text-foreground hover:underline underline-offset-4">
            Sign in now
          </Link>
        </div>
        </form>
    </div>
  )
}

export default SignUp
```

## 6. src/pages/auth/sign-in.jsx

```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/useAuth";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M24 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.8c-.1 1.1-.8 2.8-2.5 3.9l3.7 2.9c2.3-2.1 4-5.2 4-9z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.3 1.2-3.3 0-6.1-2.2-7.1-5.2l-3.9 3C3 21.3 7.2 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M4.9 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2l-3.9-3C.4 8.2 0 10 0 12s.4 3.8 1 5.2l3.9-3z"
    />
    <path
      fill="#EA4335"
      d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.2 0 3 2.7 1 6.8l3.9 3c1-3 3.8-5.1 7.1-5.1z"
    />
  </svg>
);

const SignIn = () => {
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const { login, isLoading, rememberedEmail } = useAuth();
    const [formData, setFormData] = useState(
    {
        email: rememberedEmail || "",
        password: "",
        rememberMe: false
    })


    const handleChange = (event) => {
         const { name, value, type, checked } = event.target
         setFormData((prev) => ({...prev, [name] : type === "checkbox" ? checked : value}))
         setErrors((prev) => {
           if (!prev[name] && !prev.submit) return prev
           const rest = { ...prev }
           delete rest[name]
           delete rest.submit
           return rest
         })
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Single place where raw input becomes clean data.
    // validate assumes it receives normalized values.
    const normalizeSignin = (values) => ({
      ...values,
      email: (values.email || "").trim(),
    });

    const validate = (values) => {
      const nextErrors = {};
      if (!values.email) nextErrors.email = "Email is required.";
      else if (!emailRegex.test(values.email)) nextErrors.email = "Enter a valid email.";
      if (!values.password) nextErrors.password = "Password is required.";
      return nextErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const normalized = normalizeSignin(formData);
      const validationErrors = validate(normalized);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      try {
        await login({ email: normalized.email, password: normalized.password, rememberMe: formData.rememberMe });
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setErrors((prev) => ({ ...prev, submit: err.message }));
      }
    };

    const handleGoogle = () => {
      setErrors((prev) => ({ ...prev, submit: "Google sign-in is not available in this demo yet." }));
    };


  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3">
        <h1 className="text-center text-xl font-bold text-foreground">Sign in To Continue Applying</h1>

        <button
          type="button"
          onClick={handleGoogle}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <div className="flex items-center gap-3 text-[11px] font-medium text-muted">
          <span className="h-px flex-1 bg-border" />
          OR
          <span className="h-px flex-1 bg-border" />
        </div>

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Email"
          autoComplete="email"
          hideLabel
          rightSlot={
            <span className="text-muted">
              <Mail size={16} />
            </span>
          }
        />

        <TextInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Password"
          autoComplete="current-password"
          hideLabel
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="rounded-md p-1 text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <label htmlFor="rememberMe" className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 shrink-0 cursor-pointer rounded accent-emerald-500"
          />
          <span>Remember me</span>
        </label>

        {errors.submit && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.submit}</p>}

        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-foreground px-4 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:cursor-not-allowed disabled:opacity-70">
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <div className="mt-1 w-full rounded-lg border border-border px-4 py-3 text-center text-[13px] text-muted">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-foreground hover:underline underline-offset-4">
            Sign up now
          </Link>
        </div>
        </form>
    </div>
  )
}

export default SignIn
```

## 7. src/pages/dashboard.jsx

```jsx
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {

  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  return (
    <div>
      {user?.name}
      {user?.email}
      <p>Welcome to the dashboard</p>
      <p>Logged In: {isLoggedIn ? "Yes" : "No"}</p>
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
```

## 8. src/components/ProtectedRoutes.jsx

```jsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const ProtectedRoutes = () => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />
}

export default ProtectedRoutes
```

## 9. Wire the provider — src/main.jsx (auth parts shown)

```jsx
import { ThemeProvider } from '@//context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { RouterProvider } from 'react-router-dom'
import router from '@//routes/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

## 10. Wire the routes — src/routes/router.jsx (auth parts shown)

```jsx
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";
import ProtectedRoutes from "@//components/ProtectedRoutes";

{
  element: <AuthLayout />,
  children: [
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "signin",
      element: <SignIn />,
    },
  ],
},
{
  element: <ProtectedRoutes />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ],
},
```