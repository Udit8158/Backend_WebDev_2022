import React, { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Auth = () => {
  const [registration, setRegistration] = useState(true);
  const { registerUser, logIn, isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (e) => {
    // prevent loading
    e.preventDefault();

    // user input
    const userInput = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    registration ? registerUser(userInput) : logIn(userInput);
  };

  const switchRegistrationMode = () => setRegistration((prev) => !prev);
  return (
    <div className="w-8/12 mx-auto mt-40">
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="enter your username"
          ref={usernameInputRef}
          required
          className="border-b-2  p-2 rounded-md outline-none"
        />
        <input
          type="password"
          placeholder="enter your password"
          ref={passwordInputRef}
          required
          className="border-b-2 p-2 rounded-md outline-none"
        />
        <span
          onClick={switchRegistrationMode}
          className="text-center underline cursor-pointer"
        >
          {registration ? "Log in" : "Create account"}
        </span>
        <button type="submit" className="p-2 bg-blue-700 rounded-md">
          {registration ? "Register" : "Log In"}{" "}
        </button>
      </form>
    </div>
  );
};

export default Auth;
