import { useState } from "react";
import { loginUser } from "../../services/authService";

import RoleCard from "../RoleCard/RoleCard";

import "./LoginCard.css";

function LoginCard() {

  const [role,setRole] =
  useState("student");

  const [email,setEmail] =
  useState("");

  const [password,setPassword] =
  useState("");

  const [showPassword,
  setShowPassword] =
  useState(false);

  const handleLogin =
  async(e)=>{

    e.preventDefault();

    try{

      const response =
      await loginUser({
        email,
        password,
        role
      });

      console.log(response);
      localStorage.setItem(
  "accessToken",
  response.access
);

localStorage.setItem(
  "refreshToken",
  response.refresh
);

localStorage.setItem(
  "role",
  response.role
);

localStorage.setItem(
  "name",
  response.name
);

if(response.role==="admin"){
  window.location.href =
  "/admin/dashboard";
}
else if(
response.role==="faculty"
){
  window.location.href =
  "/faculty/dashboard";
}
else{
  window.location.href =
  "/student/dashboard";
}

    }catch(error){

      alert(
      "Login Failed"
      );

    }

  };

  return(

    <div className="login-card">

      <div className="logo">
        🎓
      </div>

      <h2>Welcome Back</h2>

      <div className="roles">

        <RoleCard
          title="Admin"
          selected={
            role==="admin"
          }
          onClick={()=>
          setRole("admin")}
        />

        <RoleCard
          title="Faculty"
          selected={
            role==="faculty"
          }
          onClick={()=>
          setRole("faculty")}
        />

        <RoleCard
          title="Student"
          selected={
            role==="student"
          }
          onClick={()=>
          setRole("student")}
        />

      </div>

      <form
      onSubmit={
      handleLogin
      }>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
          setEmail(
          e.target.value)}
        />

        <div
        className=
        "password-box">

          <input
            type={
            showPassword
            ? "text"
            : "password"
            }
            placeholder=
            "Password"
            value={password}
            onChange={(e)=>
            setPassword(
            e.target.value)}
          />

          <span
          onClick={()=>
          setShowPassword(
          !showPassword)}
          >
            👁️
          </span>

        </div>

        <button
        className=
        "login-btn">
          Login
        </button>
        <div className="login-links">

  <a href="#">
    Forgot Password?
  </a>

</div>

      </form>

    </div>
  );
}

export default LoginCard;