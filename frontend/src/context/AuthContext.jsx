import {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    const role =
      localStorage.getItem("role");

    if (token) {
      setUser({
        token,
        role,
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};