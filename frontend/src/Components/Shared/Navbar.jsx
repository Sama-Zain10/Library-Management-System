import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { user, setToken, setUser } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery("");
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md text-white px-8 py-4 shadow-lg flex justify-between items-center fixed w-full top-0 z-30">
      <h2 className="text-3xl font-bold tracking-wide">📚 Library System</h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search books..."
          className="px-2 py-1 rounded text-black placeholder-white bg-transparent border border-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="text-3xl text-black  rounded font-bold">🔍</button>
      </form>
      <div className="flex gap-6 items-center">
        <Link className="text-2xl hover:text-gray-300 font-medium" to="/">
          Home
        </Link>

        {!user ? (
          <>
            <Link
              className="text-2xl hover:text-gray-300 font-medium"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-2xl hover:text-gray-300 font-medium"
              to="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link className="text-2xl font-medium" to="/profile">
              {user.fullName}
            </Link>

            {user?.role === "ADMIN" && (
              <Link className="text-2xl font-medium" to="/admin/dashboard">
                Dashboard
              </Link>
            )}

            {user?.role === "LIBRARIAN" && (
              <Link className="text-2xl font-medium" to="/lib/dashboard">
                Dashboard
              </Link>
            )}

            <button
              onClick={() => {
                setToken(null);
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
