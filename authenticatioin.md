# Authentication — Progressive Tutorial, One Functionality Per Step

How to use this file: do the steps in order, top to bottom. Each step has one
job, its complete code, and a short explanation. Paste the code, read the
explanation, move on. Nothing is abbreviated.

What you end up with: a Jobright-style signup side plus form side layout, a
validated signup form, a matching sign-in form, shared auth state in context,
and working redirects to /signin and /dashboard.

You need: React useState, Tailwind classes, react-router-dom, lucide-react.
The @/ alias points to src/.

---

## Step 1 — Build the two-sided auth layout

We start with the stage everything else sits on. First, the font. The layout
text uses Montserrat, loaded once in src/index.css. Add the Google Fonts
import at the very top (import rules must come first) and one theme line that
creates the font-auth utility:

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
@import 'tailwindcss';
```

```css
@theme {
  --font-auth: "Montserrat", ui-sans-serif, system-ui, sans-serif;
}
```

Then create file: src/layouts/AuthLayout.jsx. Full code:

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

Explanation: the split lives here, not in the pages. The left brand side
shows on large screens and hides on mobile, where the form stacks full width.
The right side only centers whatever the route renders, so signup and signin
share it with zero duplication. The green is not a full background: two
absolute blurred circles sit behind the content at the bottom left, clipped
by overflow-hidden on the panel, over a card base that follows the theme.
The page behind it uses the background token, so the two sides keep their
contrast in light and dark mode. The logo links home, and the router already
nests both auth pages under this layout, so no router change is needed.

---

## Step 2 — Create the reusable input field

Create file: src/components/ui/TextInput.jsx. Full code:

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

Explanation: the component owns no state. It receives value and onChange from
the parent, which is what makes it reusable on both auth forms. label htmlFor
matches input id so clicking the label focuses the field. hideLabel keeps a
real label for screen readers but hides it visually with sr-only, which is how
the placeholder-only Jobright design stays accessible. error is a string,
empty string means nothing shows. rightSlot renders anything at the right edge
inside the input, used for the mail icon and the eye toggle. The aria
attributes plus role="alert" let screen readers announce errors.

Check: ask why TextInput gets value and onChange instead of keeping its own
state. Answer: so the parent form holds all data in one place.

---

## Step 3 — Create the signup page shell with state

Create file: src/pages/auth/sign-up.jsx. Paste this shell first:

```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/useAuth";

const SignUp = () => {
    const [ errors, setErrors ] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(
    {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        updatesOptIn: true
    })

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <form noValidate className="flex w-full flex-col gap-3">
        <h1 className="text-center text-xl font-bold text-foreground">Sign up To Continue Applying</h1>
        {/* Google button and fields go here */}
        </form>
    </div>
  )
}

export default SignUp
```

Explanation: the form owns two boxes of state. formData holds what the user
typed, errors holds what is wrong. updatesOptIn starts true because the design
shows the updates box ticked. useNavigate, useAuth, Link, and the eye icons
are imported now so later steps only add code, never imports. noValidate turns
off the browser's built-in popups so only our messages show. The outer div is
plain centering only. The two-sided split lives in the layout from Step 1,
not in this page.

---

## Step 4 — Add the change handler

Add this function inside the SignUp component, above the return:

```jsx
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
```

Explanation: one handler for all fields. The input name tells us which key to
update, so [name] as a computed key covers text inputs and the checkbox. The
checkbox uses checked, the rest use value, hence the type check. The second
part clears the field error as soon as the user types, plus any submit banner,
which is what makes the form feel alive instead of stuck on error.

---

## Step 5 — Add validation

Add this above handleChange, inside the component:

```jsx
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
```

Explanation: validation is a pure function. Data in, errors object out. No UI,
no state, easy to test. It assumes normalized input, it never trims, because
trimming lives in exactly one place: the normalizeSignup helper above, which
also guards undefined with (values.x || ""). Each if and else-if chain
reports only the first problem per field, one clear message. The updates
checkbox is optional on purpose, it is a marketing opt-in, so it has no rule.
Terms stay as the passive agreement line under the button, like the design.

---

## Step 6 — Add submit handling

Add this after validate, inside the component:

```jsx
    const handleSubmit = (e) => {
      e.preventDefault();
      const normalized = normalizeSignup(formData);
      const validationErrors = validate(normalized);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      console.log("Valid!", normalized);
    };
```

Then attach it to the form tag: change <form noValidate ...> to
<form onSubmit={handleSubmit} noValidate ...>.

Explanation: submit does four jobs. Stop the reload, normalize once through
the shared helper, validate, then act. An empty errors object means success,
so Object.keys with length greater than zero is the gate. Normalizing first
means the checked data and the submitted data are identical, and trimming
happens in exactly one place instead of twice. The console.log is temporary,
Step 17 replaces it with the real signup call.

---

## Step 7 — Add the helpers, the Google button, and the divider

Paste this handler inside the component, after handleSubmit. First the
Google icon component, above SignUp (top of file, after imports):

```jsx
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
```

Then the Google handler, inside the component after handleSubmit:

```jsx
    const handleGoogle = () => {
      setErrors((prev) => ({ ...prev, submit: "Google sign-up is not available in this demo yet." }));
    };
```

Paste this under the h1 title, inside the form:

```jsx
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
```

Explanation: the G logo is redrawn inline, close to the official mark, no
image file needed. The Google button is type="button" so it never submits,
and since there is no Google backend it reports honestly through the same
submit banner instead of failing silently. Input styling lives in the
TextInput component from Step 2, so this page needs no local helpers.

---

## Step 8 — Render the four input fields

Paste this after the OR divider, inside the form:

```jsx
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
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Password"
          autoComplete="new-password"
          hideLabel
        />

        <TextInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm password"
          autoComplete="new-password"
          hideLabel
        />
```

Explanation: this is the TextInput from Step 2 earning its keep. Same
five-prop discipline every time: name matches a key in formData and in
errors, value displays state, onChange feeds it back. hideLabel keeps a real
label for screen readers while showing the placeholder-only design. The mail
icon rides in rightSlot. The eye toggle arrives in Step 10 and upgrades the
two password fields.

---

## Step 9 — Add the updates checkbox, the button, terms, and footer

Paste this after the fields, inside the form:

```jsx
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

        <button type="submit" className="w-full rounded-lg bg-foreground px-4 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30">
        Sign up
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
```

Explanation: the checkbox is optional marketing opt-in, ticked by default like
the design, flowing through the same handleChange checkbox branch from
Step 4. The black uppercase button is the design's signature. Terms stay as a
passive agreement line, matching the picture, with preventDefault so the
placeholder links do not jump the page. The bordered member box sends existing
users to /signin. Test now: submit empty and each field shows its error. The
form already works without any auth code. Step 17 wires the button to signup.

---

## Step 10 — Add the password eye toggle

Both password fields share one showPassword state, already declared in
Step 3. On the password TextInput, change type="password" to
type={showPassword ? "text" : "password"} and add this prop:

```jsx
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
```

Do the same type change on the confirm-password TextInput. One toggle reveals
both, which matches the design's single eye.

Explanation: the button must be type="button" or clicking the eye submits the
form. The aria-label flips so screen reader users know what the button will
do. Sharing one state keeps the two fields in sync with half the code.

---

## Step 11 — Create the context file with storage helpers

Create file: src/context/AuthContext.jsx. Paste the top half first:

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
```

Explanation: one file holds everything, because a demo backend does not earn
a second file. Two keys split two jobs: SESSION_KEY holds the current
session, ACCOUNTS_KEY holds an array of every account created in this
browser. readSession answers is anybody logged in right now; readAccounts
answers the bigger question, who has ever registered, and that array is what
survives logout. Both return null or an empty array on missing or corrupt
storage, so nothing crashes. wait stands in for network time: a promise that
resolves after ms milliseconds, so the loading flag has something real to
wait on. hashPassword is the security piece: it reads the password bytes and
returns a scrambled fixed-length string, so the plain password never touches
storage. Two words that hash by accident could collide, but for a demo the
trade-offs are fine and the lesson is the thing that matters: never store a
password, store its hash.

---

## Step 12 — Create the provider shell with persistence and loading

Continue the same file with the provider shell:

```jsx
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
```

Explanation: the provider owns three small state values: the user, the
loading flag, and the remembered email for prefilling the login form.
useState(readSession) passes the function itself so storage is read once on
mount. persist is the single funnel: storage and state always change
together; pass a user and it saves, pass null and it clears. run is the
loading wrapper: it turns the flag on, waits the fake second, runs the task,
and resets the flag in finally even when the task throws. Every action below
goes through run, which is why the buttons can swap their label while a
request is in flight.

---

## Step 13 — Add login

Continue the same file, inside the provider, after the run helper:

```jsx
  // Throws an Error with a UI-ready message on failure.
  // A registered email plus the right password can log in.
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
```

Explanation, point by point: login hands its body to run, which flips the
loading flag on, waits the fake second, and runs the body. Trim then
lowercase first, so padded emails match the same account and case cannot
create a second one. readAccounts returns the array and find walks it for a
matching email. No match throws a finished sentence the page shows directly,
never a raw code, which is the whole "only registered users can log in" rule.
A match then hashes the typed password and compares it to the stored hash.
Different hash means wrong password, and that throws too, which is the whole
"any password is not enough" rule. Never compare passwords directly: the
hash function runs on both sides and the hashes are what are compared. Only a
match signs in: the session user is built and persist stores it against
SESSION_KEY, separate from the accounts array, so logging out (Step 14)
cannot touch anyone's account. rememberMe is a form convenience, not part of
the session.

---

## Step 14 — Add signup, logout, and the provider value

Finish the same file with this:

```jsx
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

Explanation: signup accepts the password alongside name and email, hashes it
with the same helper login will use, then appends { name, email, passwordHash }
to the accounts array and spread a session flag onto a fresh copy for the
current user. The array rebuilds as a new array every time, [...], so the
spread never mutates what is stored. signup also goes through run, so it
shows the same loading behavior as login. The password itself never lives
anywhere in storage: only its hash is written, and login compares hashes, so
the raw password exists only inside the form state and this function's
argument for a moment. Say that out loud, it is a security lesson. logout is
one line: persist(null) clears only SESSION_KEY, the session, so every
account in the array signs back in whenever it wants. isLoading joins the
exposed value, a second boolean the pages read for their button labels.
isLoggedIn is derived from the stored flag right here, so pages and the guard
never inspect storage. The exposed value has exactly two booleans. The file
is now complete.

Complete assembled file for reference, src/context/AuthContext.jsx:

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

---

## Step 15 — Create the useAuth hook

Create file: src/hooks/useAuth.js. Full code:

```js
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

Explanation: this tiny file is the only door into the box. Every page uses it,
nobody imports the context directly. Outside a provider, useContext returns
undefined, and the explicit throw says exactly what went wrong. A silent
undefined would fail pages later with confusing messages.

---

## Step 16 — Wrap the app with the provider

File: src/main.jsx. Full code:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

Explanation: context only works below its provider, so AuthProvider wraps the
whole router. Anything outside it cannot call useAuth, and the throw from
Step 15 is what tells you. The new line and the wrapper are the only changes
to this file.

---

## Step 17 — Connect signup to auth with redirect

Back in src/pages/auth/sign-up.jsx. The imports from Step 3 already include
useNavigate and useAuth. Add these two lines at the top of the component, next
to the other state:

```jsx
    const navigate = useNavigate();
    const { signup, isLoading } = useAuth();
```

Replace the console.log line at the end of handleSubmit with this:

```jsx
      try {
        await signup({ fullName: normalized.fullName, email: normalized.email, password: normalized.password });
        navigate("/signin");
      } catch (err) {
        setErrors((prev) => ({ ...prev, submit: err.message }));
      }
```

Make handleSubmit async: change const handleSubmit = (e) => { to
const handleSubmit = async (e) => {.

Show auth failures above the button by pasting this right before the submit
button:

```jsx
        {errors.submit && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.submit}</p>}
```

Make the button loading-aware by replacing it with this:

```jsx
        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-foreground px-4 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:cursor-not-allowed disabled:opacity-70">
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
```

Explanation: validation gets us clean data, auth turns it into a session,
navigation finishes the story. Only trimmed values go to signup. Field errors
block the call, auth failures land in errors.submit and render in the red
banner, and typing clears it because of Step 4. disabled while loading
prevents double submit and the label says what is happening.

---

## Step 18 — Build the sign-in state, validation, and submit

Create file: src/pages/auth/sign-in.jsx. Paste the top half first. It mirrors
the signup skeleton, including the Google icon and the Google handler:

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
```

Explanation: same skeleton as signup, three deliberate differences. Password
is required-only with no min length, because a login screen must never block
existing users over policy rules. The dashboard navigation uses replace true
so the Back button cannot return to the login screen. The email field
prefills from rememberedEmail, which the context exposes, so the page never
touches localStorage directly. The remember-me checkbox flows into login,
which is the context feature from Step 13 finally being used.

---

## Step 19 — Build the sign-in form markup

Continue the same file with the full return block:

```jsx
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

Explanation: the same TextInput from Step 2, mirrored from signup.
autoComplete is current-password instead of new-password, and the footer box
points the other way. If signup works, sign-in takes ten minutes. The file is
now complete. On large screens this form sits centered in the right half of
the Step 1 layout, next to the brand panel.

---

## Step 20 — Guard the dashboard

Create file: src/components/ProtectedRoutes.jsx. Full code:

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

Then in src/routes/router.jsx use it with no props:

```jsx
{
  element: <ProtectedRoutes />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
  ]
},
```

Explanation: this step decides whether login actually reaches the dashboard.
The guard reads the derived isLoggedIn boolean from context, never storage and
never a prop. The warning to give the class: passing a hardcoded user object
with isLoggedIn false makes every login bounce back to /signin, because the
guard never sees the real session. Session data flows from context inside the
guard, not from props at route definition time, because route elements are
created once while login state changes. At the top, isLoading returns null
during the fake second after login, so the dashboard never flashes for a
logged-out user before the session lands; the signin page simply holds still
while the guard waits for the session to settle.

---

## Step 21 — The logout button on the dashboard

File: src/pages/dashboard.jsx. The logout action from the context, wired to a
real button:

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

Explanation: logout is synchronous, no await, no loading state. It clears
storage and state through persist, then navigation moves the user. Natural
homes are the dashboard header or an account menu.

---

## Step 22 — Verify everything works

Run:

```bash
npm run build
```

Then click through in order:

1. Open /signup. The brand panel sits left, the Jobright form right.
2. Submit empty. A field error appears under each input.
3. Toggle the eye. Both password fields reveal together.
4. Complete signup with the updates box ticked. The button shows Signing up... while waiting, then you land on /signin.
5. Sign in with the same email. The button shows Signing in... while waiting, then you land on /dashboard.
6. Sign in with the same email but a wrong password. The red banner says Incorrect password. Try again., no navigation.
7. Sign in with an email that never signed up. The red banner appears, no navigation.
8. Log out from the dashboard, then sign in with the same email. You land on /dashboard again.
9. Sign up a second user, log both in and out in any order. Each account survives and signs back in; logout only clears the current session.
10. Open /dashboard while logged out. You bounce back to /signin.

Closing questions, one per key idea:

1. Why doesn't TextInput own state?
2. What breaks if a name prop is misspelled?
3. Why clear errors inside handleChange?
4. Why does validate return an object instead of setting state directly?
5. Why must the eye button be type button?
6. Why do both password fields share one showPassword state?
7. Why does the two-sided split live in the layout instead of the page?
8. Why do pages never touch localStorage directly?
9. Why does login check both the email and the password hash?
10. Why replace true for the dashboard but plain navigate for signin?
11. Why must the guard call useAuth instead of receiving a user prop?

---

## Appendix A — Why the context has wait and run but no useCallback or useEffect

Say this: the file is deliberately half-async, half-plain. The async half is
the loading story, the plain half is everything else, and there are two hooks
you will not find here, by design.

Why wait and run exist: wait is a promise that resolves after ms
milliseconds, a stand-in for a server round-trip. run turns it into a loading
trip: set the flag on, wait, run the task, reset the flag in finally no matter
what. That is what makes the Sign up and Sign in buttons swap their label and
disable themselves. Without a real delay the flag would flip on and off in the
same tick and the user would never see it.

Why no useCallback: it memoizes a function across renders. Here it would only
be a prefix, because the callbacks close over nothing that changes inside the
async body. user is never read inside login or signup, persist only touches
localStorage plus the stable setUser setter, and run reaches the setLoading
setter. That is the whole audit in one sentence: no useCallback, no changed
deps, no dependency array to maintain. Recreating three small functions per
render is cheap and honest for a demo.

Why no useEffect: an earlier version listened for storage events to sync
other tabs. That is a real-world nicety, not a beginner topic, so it stays
out. The page re-renders from its own state and localStorage through the
standard mounts, which is enough for one-browser learning.

Check: ask what breaks if run keeps await but the fake wait is replaced by a
real fetch. Answer: nothing here changes, because run already awaits a
promise and finally always resets the flag; the loading story is built to
survive the swap to a backend.

---

## Appendix B — Why export { AuthContext } passes Fast Refresh

Say this: we were asked about this line, so we checked the rule source and
proved it with a test instead of guessing.

The rule is react-refresh/only-export-components, on at error level through
reactRefresh.configs.vite in eslint.config.js. Fast Refresh can only hot-swap
a file whose exports are all components, so any other export shape is an
error reading: Fast refresh only works when a file only exports components.
Move your React context(s) to a separate file.

Our file has two exports and still passes. Here is why, verified two ways:

1. export const AuthProvider is an arrow function in a capitalized variable,
   which the rule recognizes as a component. That half is never in doubt.
2. export { AuthContext } at the bottom is a bare specifier with no
   initializer visible at the export site. The rule cannot see the
   = createContext() part, so it falls back to judging by name only, and a
   capitalized name is assumed to be a component. No report.

Proof from this repo: a temp file with export const DemoContext =
createContext(null) beside a component failed lint with exactly the error
above, while our file passes npx eslint clean. The temp file was deleted
after the test.

Honest footnote for the class: the rule authors would still prefer the
context object in its own file. Our pattern is lint-clean, widely used, and
now you know precisely why it passes instead of just hoping it does.

---

## Appendix C — How async works in the auth flow

Say this: every pause in this app, the 1 second wait, the loading button text,
the redirect that happens after, is async code. Here is each piece and why it
looks the way it does.

1. login and signup are not declared async, yet they hand back a promise:
   they return run(...), and run is async. Callers write await login(...)
   exactly as if login itself were async, and the flow works.

2. await pauses only its own function, never the page. While the 1 second
   wait runs, React keeps rendering and the button shows its loading label.
   No frozen UI, because the pause is cooperative, not blocking.

3. The fake delay itself:

```js
await new Promise((resolve) => setTimeout(resolve, 1000));
```

A promise that resolves after 1000 milliseconds. It lives in one place,
inside run, so every action waits the fake second the same way. Against a
real API the login and signup bodies become fetch calls and this line goes
away with the demo. Everything around those bodies stays identical.

4. The run wrapper uses try and finally, not catch:

```js
const run = async (task) => {
  setIsLoading(true);
  try {
    await wait(1000);
    return await task();
  } finally {
    setIsLoading(false);
  }
};
```

finally runs whether the task succeeds or throws, so the loading flag always
resets. No catch here on purpose: the error must keep traveling up to the
page, which is the only place that knows how to display it.

5. The page uses try and catch, the mirror image:

```js
try {
  await login({ email: normalized.email, password: normalized.password });
  navigate("/dashboard", { replace: true });
} catch (err) {
  setErrors((prev) => ({ ...prev, submit: err.message }));
}
```

Navigation sits after the await, so it only runs on success. On failure the
thrown Error lands in the catch and becomes the banner text. Validation
errors never reach this block because the gate in Step 6 returns first.

Check: ask why the redirect sits after await login instead of beside it.
Answer: code after await runs only when the promise resolves. Beside it, the
redirect would fire before login finishes, sending unverified users to the
dashboard.
