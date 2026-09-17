```jsx
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
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
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
            placeholder="signup field" 
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
            value={formData.confirmPassword} placeholder="signup field" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"/>
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


// add error state


const TextInput = ({ label, name, type = "text", value, onChange, onBlur, error = "", placeholder = "", autoComplete = "off", rightSlot = null }) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input 
        id={inputId} 
        name={name} 
        type={type} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        placeholder={placeholder} 
        autoComplete={autoComplete} 
        aria-invalid={Boolean(error)} 
        aria-describedby={error ? errorId : undefined} className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500 ${error ? "border-red-500" : "border-border"} ${rightSlot ? "pr-12" : ""}`} />
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && <p id={errorId} className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;



import { useState } from "react";
import FormInput from "../../components/ui/FormInput";


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
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">

        <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Register now</h1>
        </div>

        <FormInput
            id="fullname"
            label="FullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="signup field"
            autoComplete="name"
        />

        <FormInput
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="signup field"
            autoComplete="email"
        />

        <FormInput
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="signup field"
            autoComplete="new-password"
        />

        <FormInput
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="signup field"
            autoComplete="new-password"
        />

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



//  add error state and validate the form 

**Positive — `validate()` returns complaints:** `{}` = valid. All shown at once, each under its field.

const [errors, setErrors] = useState({});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (values = formData) => {
  const nextErrors = {};
  if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
  else if (values.fullName.trim().length < 3) nextErrors.fullName = "Min. 3 characters.";
  if (!values.email.trim()) nextErrors.email = "Email is required.";
  else if (!emailRegex.test(values.email)) nextErrors.email = "Enter a valid email.";
  if (!values.password) nextErrors.password = "Password is required.";
  else if (values.password.length < 6) nextErrors.password = "Min. 6 characters.";
  if (!values.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
  else if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Passwords do not match.";
  return nextErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;
  console.log("Valid!", formData);
};





























































































































































































































































# React Forms — Straight Path to Auth Screens

> Teach top to bottom. Each section builds on the last one.
> Negative first, then the right way. End = the real files in your app.
> Run with `npm run dev`, open `/signup`.
>
> Companion answer key: `FULL-WORKING-CODES.md` — every finished file in full,
> section by section, in live-coding order. Keep it open on a second screen
> while you teach from here.

**Path:**
1. Uncontrolled → Controlled → 1 field, works
2. Separate handlers → One `onChange` → 3 fields, works
3. Copy-paste inputs → `TextInput` → cleaned up, works
4. Reload submit → `preventDefault` submit → logs data, works
5. `alert()` errors → `errors` object → validation, works
6. Rude errors → Polite `touched` + polish → real `sign-up.jsx`
7. Sign In → wrong slot → right slot → real `sign-in.jsx`
8. Routes + auth context + homework

---

## 1. Uncontrolled first, then controlled

**Negative — uncontrolled:** React doesn't track typing. You only read on click.

```jsx
import { useRef } from "react";
const UncontrolledOpposite = () => {
  const ref = useRef(null);
  return (
    <>
      <input ref={ref} placeholder="React doesn't track this" />
      <button onClick={() => alert(ref.current.value)}>Read on click</button>
    </>
  );
};
```
Problem: no live check possible. Can't validate while typing.

**Positive — controlled (the standard):** state owns the text, input just shows it.

```jsx
import { useState } from "react";

const SignUp = () => {
  const [fullName, setFullName] = useState("");

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold">Create account</h1>
      <label htmlFor="input-fullName" className="mt-6 block text-sm font-medium">
        Full Name
      </label>
      <input
        id="input-fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Ada Lovelace"
        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
      />
      <p className="mt-4 text-sm text-muted">Hello, {fullName || "..."}</p>
    </div>
  );
};

export default SignUp;
```

Try: type → mirror updates live. Auth uses this.

---

## 2. Separate handlers first, then one `onChange`

**Negative — one handler per field:** works for 2 fields, pain for 4+.

```jsx
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />
<input value={password} onChange={(e) => setPassword(e.target.value)} />
```

**Positive — one object + one handler:** `name` = which box, `value` = what was typed.

```jsx
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold">Create account</h1>
      <div className="mt-6 flex flex-col gap-4">
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ada Lovelace" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ada@example.com" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Min. 6 characters" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
      </div>
      <pre className="mt-4 rounded-xl bg-background border border-border p-3 text-xs">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
};

export default SignUp;
```

Try: JSON mirror updates key by key. `name` must match a key. `[name]` = use the value inside. `...prev` = keep other fields.

---

## 3. Copy-paste first, then `TextInput`

**Negative — repeated markup:** same 15 lines 3 times. Every fix must be repeated 4×.

```jsx
<label>Full Name</label>
<input name="fullName" value={formData.fullName} onChange={handleChange} className="..." />
<label>Email</label>
<input name="email" value={formData.email} onChange={handleChange} className="..." />
<label>Password</label>
<input name="password" value={formData.password} onChange={handleChange} className="..." />
```

**Positive — reusable (real file `src/components/forms/TextInput.jsx`):** fix once.

```jsx
const TextInput = ({ label, name, type = "text", value, onChange, onBlur, error = "", placeholder = "", autoComplete = "off", rightSlot = null }) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input 
        id={inputId} 
        name={name} 
        type={type} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        placeholder={placeholder} 
        autoComplete={autoComplete} 
        aria-invalid={Boolean(error)} 
        aria-describedby={error ? errorId : undefined} className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500 ${error ? "border-red-500" : "border-border"} ${rightSlot ? "pr-12" : ""}`} />
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && <p id={errorId} className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
```

Same `sign-up.jsx`, shorter:

```jsx
import { useState } from "react";
import TextInput from "@/components/forms/TextInput";

const SignUp = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold">Create account</h1>
      <div className="mt-6 flex flex-col gap-4">
        <TextInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ada Lovelace" />
        <TextInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ada@example.com" />
        <TextInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Min. 6 characters" />
      </div>
    </div>
  );
};

export default SignUp;
```

---

## 4. Reload submit first, then `preventDefault` submit

**Negative — default reload + `onClick` + native bubbles:**

```jsx
const handleSubmit = () => {
  console.log(formData); // never seen — page already reloaded
};
<form onSubmit={handleSubmit}>...</form>

<button onClick={handleSubmit}>Sign up</button>
// Enter key does nothing. Two ways to submit become one.

<input required />
// Chrome bubble, different per browser, fights our errors.
```

**Positive — collect without reload:**

```jsx
const initialForm = { fullName: "", email: "", password: "", confirmPassword: "" };

const handleSubmit = (e) => {
  e.preventDefault(); // block reload, or state is wiped
  console.log("Sign up data:", formData);
};
<form onSubmit={handleSubmit} noValidate>...</form>
```

Full shell (works, logs object):

```jsx
import { useState } from "react";
import TextInput from "@/components/forms/TextInput";

const initialForm = { fullName: "", email: "", password: "", confirmPassword: "" };

const SignUp = () => {
  const [formData, setFormData] = useState(initialForm);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
  };
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <TextInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ada Lovelace" />
        <TextInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ada@example.com" />
        <TextInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Min. 6 characters" />
        <TextInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat password" />
        <button type="submit" className="mt-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
```

---

## 5. `alert()` errors first, then `errors` object

**Negative — buried checks + popup:** one at a time, blocks page, can't style, user guesses which field.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.email.includes("@")) { alert("Bad email!"); return; }
  if (formData.password.length < 6) { alert("Bad password!"); return; }
  console.log(formData);
};
```

**Positive — `validate()` returns complaints:** `{}` = valid. All shown at once, each under its field.

```jsx
const [errors, setErrors] = useState({});

const validate = (values = formData) => {
  const nextErrors = {};
  if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
  else if (values.fullName.trim().length < 3) nextErrors.fullName = "Min. 3 characters.";
  if (!values.email.trim()) nextErrors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Enter a valid email.";
  if (!values.password) nextErrors.password = "Password is required.";
  else if (values.password.length < 6) nextErrors.password = "Min. 6 characters.";
  if (!values.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
  else if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Passwords do not match.";
  return nextErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;
  console.log("Valid!", formData);
};

// in JSX:
<TextInput ... error={errors.email} />
```

---

## 6. Rude first, then polite + polish

**Negative — always-show:** red on first load before anyone typed. Rude.

```jsx
error={errors.email}
```

**Positive — gated:** clean until visited.

```jsx
const [touched, setTouched] = useState({});
const handleBlur = (e) => {
  setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  setErrors(validate(formData));
};
// submit: setTouched({ fullName: true, email: true, password: true, confirmPassword: true });
// display: error={touched.email ? errors.email : ""}
```

**Negative — checkbox `value` bug:** stuck at `"on"`, never true/false.

```jsx
<input type="checkbox" value={agreed} onChange={(e) => setAgreed(e.target.value)} />
```

**Positive — `checked`:**

```jsx
<input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
```

**Negative — Show button with no type:** defaults to submit, clicking Show submits the form.

```jsx
<button onClick={() => setShowPassword((p) => !p)}>Show</button>
```

**Positive:**

```jsx
<button type="button" onClick={() => setShowPassword((p) => !p)}>Show</button>
```

Final = `src/pages/auth/sign-up.jsx` in your app (Sections 1–6 combined + `signup()` from `AuthContext` + `navigate("/dashboard")`). Open it — same `handleChange`, `validate`, `handleSubmit` you just built; only the ending changed (context call instead of inline `localStorage`).
Full copy: `FULL-WORKING-CODES.md` §6.

---

## 7. Sign In — wrong slot first, then right slot

Real file: `src/pages/auth/sign-in.jsx`. Same skeleton, fewer fields.
Full copy: `FULL-WORKING-CODES.md` §7.

**Negative — server failure stuffed under a field:** user thinks format is wrong.

```jsx
setErrors({ email: "No account found for this email" });
```

**Positive — banner for server, field for format:**

```jsx
setErrors({ email: "Enter a valid email address." }); // = you typed it wrong
setSubmitError("No account found. Try signing up."); // = server said no
```
Bad format → under field. Unknown account → banner on top.

In the real file this maps to `AuthContext`: `login()` throws an `Error` with the
banner text, the page catches it into `setSubmitError`. Same rule, enforced by the split.

---

## 8. Routes + homework

`src/layouts/AuthLayout.jsx` — centers card, `<Outlet />` renders child.

```jsx
import AuthLayout from "@/layouts/AuthLayout";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";

{ element: <AuthLayout />, children: [
  { path: "login", element: <SignIn /> },
  { path: "signup", element: <SignUp /> },
] }
```

Full router (incl. the protected `/dashboard` branch): `FULL-WORKING-CODES.md` §5.

---

## 9. Auth context — scattered `localStorage` first, then one store

Teach this after the forms click. The problem to show: sign-up wrote
`localStorage` inline, sign-in duplicated the same check, and the header
imported a hardcoded user object — so the header never reacted to login.

**Negative — auth scattered across pages:**

```jsx
// sign-in.jsx (before): page owns storage + fake API + navigation
const saved = JSON.parse(localStorage.getItem("user") || "null");
if (saved && saved.email && saved.email !== formData.email.trim()) {
  setSubmitError(`No account found for ${formData.email}...`);
  return;
}
localStorage.setItem("user", JSON.stringify(loggedInUser));

// Header.jsx (before): hardcoded, never updates
import user from "@/data/userData";
const isLoggedIn = user?.isLoggedIn ?? false;
```

**Positive — one store, pages just call it (same shape as `ThemeContext`):**

```jsx
// Any component:
import { useAuth } from "@/hooks/useAuth";
const { user, isLoggedIn, login, signup, logout } = useAuth();

// sign-up ending:
const newUser = await signup({ fullName: formData.fullName, email: formData.email });

// sign-in ending (throws -> banner, per Section 7):
try {
  const loggedInUser = await login({ email: formData.email, rememberMe });
  setTimeout(() => navigate(from, { replace: true }), 1200);
} catch (err) {
  setSubmitError(err.message);
}

// gate (no props — reads context itself):
const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  if (!isLoggedIn) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
};
```

Rule of thumb for students: **validation stays in the page, auth lives in the
context.** The fake `setTimeout` API from old homework #3 now lives in
`AuthContext` (`login`/`signup`), so swapping in a real `fetch(...)` later
means editing one file, not two pages.

Full copies in build order: `FULL-WORKING-CODES.md` §§1–4 (context, hook,
`main.jsx`, gate) then §§8–10 (header, dashboard, dashboard header).

Homework:
1. Add `username` (min 4, no spaces) to Sign Up.
2. Add "Forgot password?" under Sign In → sets `submitError`.
3. (Done in class — see `AuthContext`): the old `setTimeout` fake API moved into
   `login()`/`signup()`. Next step: replace the `wait(1000)` inside the context
   with a real `fetch(...)` + `try/catch` — pages already handle thrown errors,
   so they won't change.
