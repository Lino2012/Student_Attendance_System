import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage
from "../pages/Login/LoginPage";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <h1>
            Admin Dashboard
          </h1>
        }
      />

      <Route
        path="/faculty/dashboard"
        element={
          <h1>
            Faculty Dashboard
          </h1>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <h1>
            Student Dashboard
          </h1>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />

    </Routes>

  );
}

export default AppRoutes;