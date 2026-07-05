import "./LoginPage.css";
import LoginCard from "../../components/LoginCard/LoginCard";

function LoginPage() {
  return (
    <div className="login-page">

      <div className="left-panel">

        <div className="image-overlay"></div>

        {/* Floating Cards */}

        <div className="floating-card students">
          <h3>1245</h3>
          <p>Students</p>
        </div>

        <div className="floating-card attendance">
          <h3>96%</h3>
          <p>Attendance</p>
        </div>

        <div className="floating-card faculty">
          <h3>84</h3>
          <p>Faculty</p>
        </div>

        <div className="branding">

          <h1>
            Student Automation System
          </h1>

          <p>
            Manage • Track • Analyze
          </p>

        </div>

        <div className="support">

          <span>
            Need Assistance?
          </span>

          <a href="#">
            support@college.edu
          </a>

        </div>

      </div>

      <div className="right-panel">

        <LoginCard />

      </div>

    </div>
  );
}

export default LoginPage;