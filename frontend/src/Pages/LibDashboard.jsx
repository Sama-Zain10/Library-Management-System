// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../Components/Shared/AuthContext";

// export default function BooksDashboard() {
//   const { user, token } = useContext(AuthContext);

//   const [books, setBooks] = useState([]);
//   const [borrows, setBorrows] = useState([]);
//   const [error, setError] = useState("");

//   const [newBook, setNewBook] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     publishedYear: "",
//     category: "",
//     available: true,
//   });

//   const [editingBookId, setEditingBookId] = useState(null);
//   const [editBook, setEditBook] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     publishedYear: "",
//     category: "",
//     available: true,
//   });

//   /* ===================== FETCH BOOKS & BORROWS ===================== */
//   useEffect(() => {
//     if (!user || !token) {
//       setError("You must be logged in.");
//       return;
//     }

//     fetchBooks();
//     fetchBorrows();
//   }, [user, token]);

//   async function fetchBooks() {
//     try {
//       const res = await fetch("http://localhost:9090/api/books", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch books");
//       setBooks(await res.json());
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function fetchBorrows() {
//     try {
//       const res = await fetch("http://localhost:9090/api/borrows", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch borrows");
//       const data = await res.json();
//       setBorrows(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   /* ===================== GET BORROWED BY ===================== */
//   function getBorrowedBy(bookId) {
//     const borrow = borrows.find(
//       (b) => b.bookId === bookId && b.status === "BORROWED"
//     );
//     return borrow ? borrow.userName : "-";
//   }

//   /* ===================== ADD BOOK ===================== */
//   async function handleAddBook(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:9090/api/books", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newBook),
//       });
//       if (!res.ok) throw new Error("Failed to add book");
//       setNewBook({ title: "", author: "", isbn: "", publishedYear: "", category: "", available: true });
//       fetchBooks();
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   /* ===================== EDIT BOOK ===================== */
//   function startEdit(book) {
//     setEditingBookId(book.id);
//     setEditBook({ ...book });
//   }

//   function cancelEdit() {
//     setEditingBookId(null);
//   }

//   async function saveEdit(bookId) {
//     try {
//       const res = await fetch(`http://localhost:9090/api/books/${bookId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editBook),
//       });
//       if (!res.ok) throw new Error("Failed to update book");
//       setEditingBookId(null);
//       fetchBooks();
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   /* ===================== DELETE BOOK ===================== */
//   async function handleDeleteBook(bookId) {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       const res = await fetch(`http://localhost:9090/api/books/${bookId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to delete book");
//       fetchBooks();
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   /* ===================== STATS ===================== */
//   const totalBooks = books.length;
//   const borrowedBooks = borrows.filter((b) => b.status === "BORROWED").length;
//   const availableBooks = totalBooks - borrowedBooks;

//   if (error) {
//     return (
//       <div className="p-8 text-center">
//         <h1 className="text-2xl font-bold text-red-600">Error</h1>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-amber-950 mb-6">📚 Books Dashboard</h1>

//       {/* ===================== STATS ===================== */}
//       <div className="flex gap-6 mb-6 w-full">
//         <div className="bg-white p-6 rounded shadow text-center">
//           <h2 className="text-lg font-semibold">Total Books</h2>
//           <p className="font-bold text-3xl">{totalBooks}</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow text-center">
//           <h2 className="text-lg font-semibold">Available</h2>
//           <p className="font-bold text-3xl">{availableBooks}</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow text-center">
//           <h2 className="text-lg font-semibold">Borrowed</h2>
//           <p className="font-bold text-3xl">{borrowedBooks}</p>
//         </div>
//       </div>

//       {/* ===================== ADD BOOK FORM ===================== */}
//       <form onSubmit={handleAddBook} className="bg-white shadow-md p-4 rounded-lg mb-8 max-w-xl">
//         <h2 className="text-xl font-bold mb-3">➕ Add Book</h2>
//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Title"
//           value={newBook.title}
//           onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//           required
//         />
//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Author"
//           value={newBook.author}
//           onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//           required
//         />
//         <button className="bg-green-700 text-white px-4 py-2 rounded">Add</button>
//       </form>

//       {/* ===================== BOOKS TABLE ===================== */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full">
//           <thead className="bg-amber-900 text-white">
//             <tr>
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3 text-left">Author</th>
//               <th className="p-3 text-left">Borrowed By</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id} className="border-b">
//                 <td className="p-3">
//                   {editingBookId === book.id ? (
//                     <input
//                       className="border p-1"
//                       value={editBook.title}
//                       onChange={(e) =>
//                         setEditBook({ ...editBook, title: e.target.value })
//                       }
//                     />
//                   ) : (
//                     book.title
//                   )}
//                 </td>
//                 <td className="p-3">
//                   {editingBookId === book.id ? (
//                     <input
//                       className="border p-1"
//                       value={editBook.author}
//                       onChange={(e) =>
//                         setEditBook({ ...editBook, author: e.target.value })
//                       }
//                     />
//                   ) : (
//                     book.author
//                   )}
//                 </td>
//                 <td className="p-3">{getBorrowedBy(book.id)}</td>
//                 <td className="p-3 flex gap-2">
//                   {editingBookId === book.id ? (
//                     <>
//                       <button
//                         onClick={() => saveEdit(book.id)}
//                         className="bg-green-600 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         className="bg-gray-500 text-white px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => startEdit(book)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBook(book.id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Shared/AuthContext";

export default function BooksDashboard() {
  const { user, token } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [error, setError] = useState("");

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    category: "",
    available: true,
  });

  const [editingBookId, setEditingBookId] = useState(null);
  const [editBook, setEditBook] = useState({ ...newBook });

  /* ===================== FETCH BOOKS & BORROWS ===================== */
  useEffect(() => {
    if (!user || !token) {
      setError("You must be logged in.");
      return;
    }
    fetchBooks();
    fetchBorrows();
  }, [user, token]);

  async function fetchBooks() {
    try {
      const res = await fetch("http://localhost:9090/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch books");
      setBooks(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchBorrows() {
    try {
      const res = await fetch("http://localhost:9090/api/borrows/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch borrows");
      setBorrows(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== GET BORROWED BY ===================== */
  function getBorrowedBy(bookId) {
    const borrow = borrows.find(
      (b) => b.bookId === bookId && b.status === "BORROWED"
    );
    return borrow ? borrow.userName : "-";
  }

  /* ===================== ADD BOOK ===================== */
  async function handleAddBook(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9090/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) throw new Error("Failed to add book");
      setNewBook({ title: "", author: "", isbn: "", publishedYear: "", category: "", available: true });
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== EDIT BOOK ===================== */
  function startEdit(book) {
    setEditingBookId(book.id);
    setEditBook({ ...book });
  }

  function cancelEdit() {
    setEditingBookId(null);
  }

  async function saveEdit(bookId) {
    try {
      const res = await fetch(`http://localhost:9090/api/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editBook),
      });
      if (!res.ok) throw new Error("Failed to update book");
      setEditingBookId(null);
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== DELETE BOOK ===================== */
  async function handleDeleteBook(bookId) {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`http://localhost:9090/api/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete book");
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== STATS ===================== */
  const totalBooks = books.length;
  const borrowedBooks = borrows.filter((b) => b.status === "BORROWED").length;
  const availableBooks = totalBooks - borrowedBooks;

  if (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-amber-950 mb-6">📚 Books Dashboard</h1>

      {/* ===================== STATS ===================== */}
      <div className="flex gap-6 mb-6 w-full">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Books</h2>
          <p className="font-bold text-3xl">{totalBooks}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Available</h2>
          <p className="font-bold text-3xl">{availableBooks}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Borrowed</h2>
          <p className="font-bold text-3xl">{borrowedBooks}</p>
        </div>
      </div>

      {/* ===================== ADD BOOK FORM ===================== */}
      <form onSubmit={handleAddBook} className="bg-white shadow-md p-4 rounded-lg mb-8 max-w-xl">
        <h2 className="text-xl font-bold mb-3">➕ Add Book</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <button className="bg-green-700 text-white px-4 py-2 rounded">Add</button>
      </form>

      {/* ===================== BOOKS TABLE ===================== */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-amber-900 text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Borrowed By</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="p-3">
                  {editingBookId === book.id ? (
                    <input
                      className="border p-1"
                      value={editBook.title}
                      onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                    />
                  ) : book.title}
                </td>
                <td className="p-3">
                  {editingBookId === book.id ? (
                    <input
                      className="border p-1"
                      value={editBook.author}
                      onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                    />
                  ) : book.author}
                </td>
                <td className="p-3">{getBorrowedBy(book.id)}</td>
                <td className="p-3 flex gap-2">
                  {editingBookId === book.id ? (
                    <>
                      <button onClick={() => saveEdit(book.id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={cancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(book)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDeleteBook(book.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
