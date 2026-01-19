import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;
    fetchBooks();
    fetchBorrows();
  }, [query]);

  /* ===================== FETCH BOOKS ===================== */
  async function fetchBooks() {
    try {
      const res = await fetch(`http://localhost:9090/api/books/search/title?title=${query}`);
      if (!res.ok) throw new Error("Failed to fetch books");
      setBooks(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== FETCH BORROWS ===================== */
  async function fetchBorrows() {
    try {
      const res = await fetch("http://localhost:9090/api/borrows");
      if (!res.ok) throw new Error("Failed to fetch borrows");
      setBorrows(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== GET BORROWED BY ===================== */
  function getBorrowedBy(bookId) {
    const borrow = borrows.find(
      (b) => b.book?.id === bookId && b.returned === false
    );
    return borrow ? borrow.user?.fullName : "-";
  }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!books.length) return <p>No results found for "{query}"</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Year</th>
            <th className="p-2">Category</th>
            <th className="p-2">ISBN</th>
            <th className="p-2">Borrowed By</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.year || "-"}</td>
              <td className="p-2">{book.category || "-"}</td>
              <td className="p-2">{book.isbn || "-"}</td>
              <td className="p-2">{getBorrowedBy(book.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
