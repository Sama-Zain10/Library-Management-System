import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Shared/AuthContext";

const Homepage = () => {
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9090/api/books", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1hODBAdGVzdC5jb20iLCJpYXQiOjE3NjU3NTg4NzQsImV4cCI6MTc2NTg0NTI3NH0.0mqx41eJU8lkvpEqCFNsT1wMbOC1_b7QFR-243QLsWc"`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="top-0 w-full h-screen flex items-center justify-center absolute"
        style={{
          backgroundImage: "url('/library-background-wz960wpmas31buy9.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Welcome to Our Library
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-200">
            Discover, borrow, and enjoy your favorite books anytime. Join our
            community of readers and explore endless knowledge.
          </p>
        </div>
      </div>

      {/* Books Section */}
      <div className="w-full max-w-6xl px-4 mt-170 mb-6 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-amber-950">Our Collection</h2>
      </div>

      {loading ? (
        <p className="text-gray-700 text-lg">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 mb-10">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20 hover:scale-105 transition flex flex-col justify-between"
            >
              <div className="h-48 bg-gray-400/20 rounded-lg mb-4 overflow-hidden">
                <img
                  src={`http://localhost:9090/images/${book.cover}`}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-amber-950">
                  {book.title}
                </h3>
                <div className="flex justify-between text-gray-700 text-md">
                  <span>{book.year}</span>
                  <span>{book.author}</span>
                </div>
                <Link
                  to={`/borrow/${book.id}`}
                  className="mt-3 bg-amber-900 text-white font-semibold py-2 rounded-xl cursor-pointer hover:bg-amber-800 transition-all text-center"
                >
                  Borrow
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
