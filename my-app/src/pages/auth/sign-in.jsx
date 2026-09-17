import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "@/components/forms/TextInput";

// Same standard pattern as SignUp, but with fewer fields:
// formData -> handleChange -> validate -> handleSubmit (with preventDefault)
const initialForm = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault(); // <-- critical: prevents full page reload

    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ email: true, password: true });
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    // Fake login: replace with fetch("/api/login", ...) in a real app
    setTimeout(() => {
      // Demo check: if a user signed up before, emails should match.
      // Otherwise accept any valid form so students can test instantly.
      const saved = JSON.parse(localStorage.getItem("user") || "null");

      if (saved && saved.email && saved.email !== formData.email.trim()) {
        setIsSubmitting(false);
        setSubmitError(
          `No account found for ${formData.email}. Try signing up first.`
        );
        return;
      }

      const loggedInUser = {
        name: saved?.name || formData.email.trim().split("@")[0],
        email: formData.email.trim(),
        isLoggedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loggedInUser.email);
      }

      setIsSubmitting(false);
      setSuccessMessage(`Welcome back, ${loggedInUser.name}! Redirecting...`);

      setTimeout(() => navigate("/dashboard"), 1200);
    }, 1000);
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
