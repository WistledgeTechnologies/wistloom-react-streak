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