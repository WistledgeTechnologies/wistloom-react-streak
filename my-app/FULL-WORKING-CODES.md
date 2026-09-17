# Full Working Codes — Auth System

> Companion to `REACT-FORMS-LESSON.md`. That file teaches the ideas step by step.
> This file is the answer key: every auth file in full, in the order you code them live.
> Keep this open on one screen, code on the other.

**Build order (tick off as you go):**

1. `src/context/AuthContext.jsx` — the store (user state + login/signup/logout)
2. `src/hooks/useAuth.js` — the accessor (one-line hook)
3. `src/main.jsx` — wrap the app in the provider
4. `src/components/ProtectedRoutes.jsx` — the gate for private pages
5. `src/routes/router.jsx` — the protected `/dashboard` branch
6. `src/pages/auth/sign-up.jsx` — validate, then `signup()`
7. `src/pages/auth/sign-in.jsx` — validate, then `login()`
8. `src/components/Header/Header.jsx` — show Dashboard vs Log in buttons
9. `src/pages/dashboard.jsx` — read the user, log out
10. `src/components/dashboard/DashboardHeader.jsx` — name + log out button

**Cheat sheet — use auth anywhere:**

```jsx
import { useAuth } from "@/hooks/useAuth";

const { user, isLoggedIn, isAuthenticated, isLoading, login, signup, logout } = useAuth();
```

- `user` = `{ name, email, isLoggedIn }` or `null` when logged out.
- `isLoggedIn` / `isAuthenticated` = same boolean, pick the name you like.
- `login({ email, rememberMe })` = async, throws `Error` if no account matches.
- `signup({ fullName, email })` = async, creates + logs in.
- `logout()` = sync, clears storage.

---

## 1. `src/context/AuthContext.jsx`

**Say this:** "Context is a shared box. The provider holds the user and the three actions. Every page below just opens the box with `useAuth()` — no prop drilling, no direct `localStorage` in pages."

```jsx
import { createContext, useCallback, useEffect, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "user";

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    // Only treat it as logged in if the flag is set
    return parsed?.isLoggedIn ? parsed : null;
  } catch {
    return null;
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [isLoading, setIsLoading] = useState(false);

  // Keep other tabs in sync if user logs in/out elsewhere
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setUser(getInitialUser());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const persist = (nextUser) => {
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(nextUser);
  };

  // Fake API: mirrors the demo logic previously duplicated in the pages.
  // Throws an Error with a UI-ready message on failure.
  const login = useCallback(async ({ email, rememberMe = false }) => {
    setIsLoading(true);
    try {
      await wait(1000);

      const normalizedEmail = email.trim();
      const saved = getInitialUser();

      if (saved?.email && saved.email !== normalizedEmail) {
        throw new Error(`No account found for ${normalizedEmail}. Try signing up first.`);
      }

      const loggedInUser = {
        name: saved?.name || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        isLoggedIn: true,
      };

      persist(loggedInUser);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loggedInUser.email);
      }

      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async ({ fullName, email }) => {
    setIsLoading(true);
    try {
      await wait(1000);

      const newUser = {
        name: fullName.trim(),
        email: email.trim(),
        isLoggedIn: true,
      };

      persist(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    persist(null);
  }, []);

  const isLoggedIn = Boolean(user?.isLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        // alias - some codebases prefer `isAuthenticated`
        isAuthenticated: isLoggedIn,
        isLoading,
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

---

## 2. `src/hooks/useAuth.js`

**Say this:** "Same shape as `useTheme`. One hook, one job: open the box, crash loudly if there is no provider so you catch the mistake instantly."

```js
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
```

---

## 3. `src/main.jsx`

**Say this:** "Provider goes here, once. Everything under it — including the router — can call `useAuth()`. Order with `ThemeProvider` doesn't matter."

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { RouterProvider } from 'react-router-dom'
import router from '@/routes/router'

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

---

## 4. `src/components/ProtectedRoutes.jsx`

**Say this:** "Before: it took a `user` prop from a hardcoded file — never updated. Now: it reads live auth state. Logged out → bounce to `/login`, and we remember where you came from so login can send you back."

```jsx
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth()
    const location = useLocation()

    if(!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />
}

export default ProtectedRoutes
```

---

## 5. `src/routes/router.jsx` (protected branch only)

**Say this:** "Nothing special — the element is the gate, the child is the layout. No props passed, the gate reads context itself. Full file below for copy-paste."

```jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import Pricing from "@/pages/pricing";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import ProtectedRoutes from "@/components/ProtectedRoutes";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "pricing",
            element: <Pricing />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <SignIn />,
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
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
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
```

---

## 6. `src/pages/auth/sign-up.jsx`

**Say this:** "The form pattern from the lesson is untouched — `formData`, `handleChange`, `validate`, `touched`. Only the ending changed: instead of writing `localStorage` inline, we `await signup()` and let the context do it. That's the homework #3 answer: the fake `setTimeout` API now lives in one place."

```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "@/components/forms/TextInput";
import { useAuth } from "@/hooks/useAuth";

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
  const { signup } = useAuth();

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

  const handleSubmit = async (e) => {
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

    // Auth lives in AuthContext - the page only validates + calls signup().
    // (Replaces the old localStorage + setTimeout fake API call.)
    try {
      const newUser = await signup({
        fullName: formData.fullName,
        email: formData.email,
      });

      setSuccessMessage(`Account created for ${newUser.email}! Redirecting...`);
      setFormData(initialForm);
      setTouched({});
      setAgreed(false);

      setTimeout(() => navigate("/dashboard"), 1200);
    } finally {
      setIsSubmitting(false);
    }
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
```

---

## 7. `src/pages/auth/sign-in.jsx`

**Say this:** "Same skeleton as sign-up, fewer fields. Two new lines: we read `location.state.from` (where the gate bounced us from) and we `await login()`. Server failure → `submitError` banner, never stuffed under a field — that's lesson section 7 in action: `login()` throws, we catch."

```jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextInput from "@/components/forms/TextInput";
import { useAuth } from "@/hooks/useAuth";

// Same standard pattern as SignUp, but with fewer fields:
// formData -> handleChange -> validate -> handleSubmit (with preventDefault)
const initialForm = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const validate = (values = formData) => {
    const nextErrors = {};

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

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // <-- critical: prevents full page reload

    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ email: true, password: true });
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    // Auth lives in AuthContext - the page only validates + calls login().
    try {
      const loggedInUser = await login({
        email: formData.email,
        rememberMe,
      });

      setSuccessMessage(`Welcome back, ${loggedInUser.name}! Redirecting...`);
      setTimeout(() => navigate(from, { replace: true }), 1200);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">
        Log in with your email and password.
      </p>

      {successMessage && (
        <p className="mt-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
          {successMessage}
        </p>
      )}
      {submitError && (
        <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {submitError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ""}
          placeholder="you@example.com"
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
          placeholder="Your password"
          autoComplete="current-password"
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

        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>

      <p className="mt-3 rounded-xl bg-background border border-border px-4 py-3 text-xs text-muted">
        Demo tip: sign up first, then log in with the same email. Or just type any
        valid email + 6-char password to test the success flow.
      </p>
    </div>
  );
};

export default SignIn;
```

---

## 8. `src/components/Header/Header.jsx`

**Say this:** "Before: it imported a hardcoded user object — the button never changed after login. Now: one hook, reactive. Log in → header flips to Dashboard instantly."

```jsx
import { useState } from "react";
import Logo from "./Logo";
import DesktopBar from "./DesktopBar";
import MobileNav from "./MobileNav";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6 lg:gap-8">
          <Logo onNavigate={closeMenu} />
          <DesktopBar isLoggedIn={isLoggedIn} />
          <MobileNav
            isOpen={isOpen}
            onToggle={toggleMenu}
            onClose={closeMenu}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
```

---

## 9. `src/pages/dashboard.jsx`

**Say this:** "No more `JSON.parse(localStorage...)` in the page. And note the guard: the old version crashed on `savedUser.name` when logged out. Context + gate means `user` is always set here, but the `if (!user) return null` keeps it crash-proof."

```jsx
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      {user.name}
      {user.email}
      <p>Welcome to the dashboard</p>
      <p>Logged In: {user.isLoggedIn ? "Yes" : "No"}</p>
      <button
        type="button"
        onClick={logout}
        className="mt-4 rounded-full border border-border px-6 py-2.5 text-sm font-medium"
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
```

---

## 10. `src/components/dashboard/DashboardHeader.jsx`

**Say this:** "Proof the context reaches deep components without props: header shows the name and logs out, then sends you to `/login`."

```jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-black text-white flex items-center justify-between px-4">
      <span>DashboardHeader</span>
      <div className="flex items-center gap-3">
        {user && <span className="text-sm text-gray-300">{user.name}</span>}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader
```

---

## Live-coding flow (5 steps)

1. **Show the mess:** pages writing `localStorage` directly, header importing a hardcoded user. Ask: "what updates the header after login?" (Nothing.)
2. **Code sections 1–2:** context + hook. Point out it's the same shape as `ThemeContext` / `useTheme` — they already know this pattern.
3. **Code sections 3–5:** provider, gate, router branch. Demo: visit `/dashboard` logged out → bounced to `/login`.
4. **Code sections 6–7:** replace the `localStorage` + `setTimeout` blocks with `signup()` / `login()`. Stress: validation stays in the page, auth moves to context.
5. **Code sections 8–10:** header flips, dashboard reads user, logout works. Open two tabs to show the `storage` sync.
