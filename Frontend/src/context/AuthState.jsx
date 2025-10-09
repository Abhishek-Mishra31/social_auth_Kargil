import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = ({ children }) => {
  const host = import.meta.env.VITE_BACKEND_HOSTED_URL;
  const googleHost = import.meta.env.VITE_GOOGLE_HOSTED_URL;

  const userLogin = async (email, password) => {
    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    return result;
    f;
  };

  const userSignup = async (email, name, password) => {
    const response = await fetch(`${host}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ email, name, password }),
    });

    const result = await response.json();
    return result;
  };

  const handleGoogleSignup = () => {
    window.location.href = googleHost;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleHost;
  };

  return (
    <>
      <AuthContext.Provider
        value={{ userLogin, userSignup, handleGoogleSignup, handleGoogleLogin }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthState;
