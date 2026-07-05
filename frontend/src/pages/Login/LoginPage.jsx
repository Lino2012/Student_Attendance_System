import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaClipboardCheck,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

import "./LoginPage.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">

      {/* LEFT SECTION */}

      <section className="left-panel">

        <div className="left-content">

          <p className="welcome">
            Welcome Back 👋
          </p>

          <h1>
            Smart Campus
            <br />
            Management
            <br />
            <span>Made Simple.</span>
          </h1>

          <p className="description">
            Manage students, faculty, attendance,
            assignments, marks and reports from
            a single platform.
          </p>

          <div className="divider"></div>

          <div className="features">

            <div className="feature">
              <FaUserGraduate />
              <span>
                Student Management
              </span>
            </div>

            <div className="feature">
              <FaClipboardCheck />
              <span>
                Attendance Tracking
              </span>
            </div>

            <div className="feature">
              <FaChartLine />
              <span>
                Reports & Analytics
              </span>
            </div>

            <div className="feature">
              <FaBell />
              <span>
                Smart Notifications
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* RIGHT SECTION */}

      <section className="right-panel">

        <div className="login-box">

          <div className="login-header">
  <span className="logo">🎓</span>
  <h2>Login</h2>
</div>

          <p className="subtitle">
            Access your account and continue.
          </p>

          <form onSubmit={handleSubmit}>

            <label>
              Username
            </label>

            <div className="input-box">

              <FaUser className="input-icon" />

              <input
                type="text"
                placeholder="Enter your username"
              />

            </div>

            <label>
              Password
            </label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            <div className="options">

              <label className="remember">

                <input
                  type="checkbox"
                />

                Remember Me

              </label>

              <a href="/">
                Forgot Password?
              </a>

            </div>

            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>

            <div className="contact-admin">

              Don't have an account?

              <a href="/">
                Contact Admin
              </a>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default LoginPage;