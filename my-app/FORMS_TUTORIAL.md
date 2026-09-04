# React Forms - Simple Tutorial for Beginners

> For new students. Small steps. Copy 10 lines at a time and run.

---

## How to Run

```bash
npm install
npm run dev
```
Open http://localhost:5173

---

## Lesson 1: The 3 Lines You Need (Controlled Input)

This is the smallest form in React:

```jsx
import { useState } from "react";

function MyInput() {
  const [name, setName] = useState(""); // 1. state

  return (
    <input
      value={name} // 2. show state
      onChange={(e) => setName(e.target.value)} // 3. update state
      placeholder="Type name"
    />
  );
}
```

- `name` = what user typed
- `e.target.value` = text inside box
- Try add `<p>Hello {name}</p>` to see live update

---

## Lesson 2: Textarea (Big Box)

Same as input, just bigger:

```jsx
const [msg, setMsg] = useState("");

<textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} />

<p>{200 - msg.length} chars left</p>
```

In React, `<textarea />` is self-closing (not like HTML).

---

## Lesson 3: Select (Dropdown)

```jsx
const [country, setCountry] = useState("ng");

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="ng">Nigeria</option>
  <option value="gh">Ghana</option>
  <option value="us">USA</option>
</select>

<p>Selected: {country}</p>
```

Use `.map()` if you have many options.

---

## Lesson 4: Checkbox & Radio

**Checkbox (true/false):**
```jsx
const [agree, setAgree] = useState(false);

<input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
```

**Radio (choose one):**
```jsx
const [gender, setGender] = useState("");

<input type="radio" name="gender" value="male" checked={gender==="male"} onChange={(e)=>setGender(e.target.value)} /> Male
<input type="radio" name="gender" value="female" checked={gender==="female"} onChange={(e)=>setGender(e.target.value)} /> Female
```

---

## Lesson 5: Simple Validation

Check before submit:

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // VERY IMPORTANT - stops refresh

  if (!email.includes("@")) return alert("Bad email");
  if (password.length < 6) return alert("Password too short");

  console.log("OK", { email, password });
};
```

Show error under box: `{error && <p style={{color:"red"}}>{error}</p>}`

---

## Lesson 6: Reusable InputField (Use This for Signup)

Make one component, use everywhere:

```jsx
// InputField.jsx
function InputField({ label, name, value, onChange, error, type="text", placeholder }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div>
      <label>{label}</label>
      <input name={name} type={isPw && show ? "text" : type} value={value} onChange={onChange} placeholder={placeholder} />
      {isPw && <button type="button" onClick={()=>setShow(!show)}>{show?"Hide":"Show"}</button>}
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

// Use it:
<InputField label="Email" name="email" value={form.email} onChange={handleChange} />
```

---

## Lesson 7: Simple Signup Form (Only 3 Fields!)

```jsx
// SignUpForm.jsx
import { useState } from "react";
import InputField from "./InputField";
import { useAuth } from "./hooks/useAuth";

function SignUpForm() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name) err.name = "Name needed";
    if (!form.email.includes("@")) err.email = "Need @";
    if (form.password.length < 6) err.password = "Min 6";
    if (Object.keys(err).length) return setErrors(err);

    register(form); // saves to localStorage
    alert("Created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
      <InputField label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
      <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
      <button type="submit">Create Account</button>
    </form>
  );
}
```

---

## Lesson 8: AuthContext (Fake Backend with localStorage)

No server? Use localStorage:

```jsx
// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")) || null);

  useEffect(()=> localStorage.setItem("users", JSON.stringify(users)), [users]);
  useEffect(()=> localStorage.setItem("currentUser", JSON.stringify(currentUser)), [currentUser]);

  const register = ({ name, email, password }) => {
    if (users.find(u => u.email === email)) throw new Error("Email exists");
    const newUser = { id: Date.now().toString(), name, email, password };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };
  const login = ({ email, password }) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Wrong email or password");
    setCurrentUser(found);
  };
  const logout = () => setCurrentUser(null);

  return <AuthContext.Provider value={{ users, currentUser, register, login, logout }}>{children}</AuthContext.Provider>;
}

// useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const useAuth = () => useContext(AuthContext);
```

Wrap App: `<AuthProvider><App/></AuthProvider>` in `main.jsx`

---

## Lesson 9: Submit to Server (fetch)

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });
  const data = await res.json();
  console.log(data);
};
```

---

## Common Mistakes

1. Forgot `e.preventDefault()` -> page refreshes
2. `name="email"` must match `form.email`
3. Forgot `value={form.email}` -> not controlled
4. Forgot wrap App with `<AuthProvider>`

---

## Exercises

1. Add `phone` field to signup (add to state + `<InputField>`)
2. Make login with only email + password
3. Show user count: `const {users}=useAuth(); users.length`

Happy coding! Copy small, run, then add more.
