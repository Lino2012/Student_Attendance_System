import { useState } from "react";
import { loginUser } from "../../services/authService";
import "./LoginPage.css";

function LoginPage() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
        role,
      });

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

      if (response.role === "admin") {
        window.location.href =
          "/admin/dashboard";
      } else if (
        response.role === "faculty"
      ) {
        window.location.href =
          "/faculty/dashboard";
      } else {
        window.location.href =
          "/student/dashboard";
      }
    } catch (error) {
      console.error(error);

      alert(
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Floating Shapes */}

      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>

      {/* Left Side */}

      <div className="left-section">

        <div className="hero-content">

          <h1>
            Student Automation System
          </h1>

          <p>
            Manage students, faculty,
            attendance, marks and reports
            through one centralized
            platform.
          </p>

          <div className="feature-list">

            <div className="feature">
              ✓ Student Management
            </div>

            <div className="feature">
              ✓ Attendance Tracking
            </div>

            <div className="feature">
              ✓ Marks & Reports
            </div>

            <div className="feature">
              ✓ Academic Analytics
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="right-section">

        <div className="login-card">

          <div className="logo">
            🎓
          </div>

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to continue
          </p>

          <form
            onSubmit={handleLogin}
          >

            <label>
              Login As
            </label>

            <div className="role-selector">

              <button
                type="button"
                className={
                  role === "admin"
                    ? "active-role"
                    : ""
                }
                onClick={() =>
                  setRole("admin")
                }
              >
                Admin
              </button>

              <button
                type="button"
                className={
                  role === "faculty"
                    ? "active-role"
                    : ""
                }
                onClick={() =>
                  setRole("faculty")
                }
              >
                Faculty
              </button>

              <button
                type="button"
                className={
                  role === "student"
                    ? "active-role"
                    : ""
                }
                onClick={() =>
                  setRole("student")
                }
              >
                Student
              </button>

            </div>

            <div className="input-group">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <span
                className="toggle-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </span>

            </div>

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                />

                Remember Me

              </label>

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

          <div className="footer-text">
            © 2026 Student Automation
            System
          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;