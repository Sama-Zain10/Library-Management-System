import { createContext, useEffect, useState, useRef } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const userRef = useRef(user); 

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    fetch("http://localhost:9090/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (userRef.current !== data) { 
          setUser(data);
          userRef.current = data; 
        }
      })
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      });
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
