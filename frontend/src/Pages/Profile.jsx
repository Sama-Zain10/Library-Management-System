import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Shared/AuthContext";

export default function Profile() {
  const { user: contextUser, token } = useContext(AuthContext); 
  const [borrows, setBorrows] = useState([]);

  const user = contextUser || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  async function fetchData() {
    if (!user || !token) return;

    const borrowsRes = await fetch(`http://localhost:9090/api/borrows/user/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const borrowsData = await borrowsRes.json();

    const booksRes = await fetch("http://localhost:9090/api/books", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const booksData = await booksRes.json();

    const borrowsWithBooks = borrowsData.map(b => {
      const book = booksData.find(book => book.id === b.bookId);
      return {
        ...b,
        bookTitle: book?.title || "-",
        bookAuthor: book?.author || "-",
      };
    });

    setBorrows(borrowsWithBooks);
  }

  fetchData().catch(err => console.error(err));
}, [user, token]);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">User not logged in</h1>
        <p>Please login to see your profile and borrowed books.</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-950 mb-4">My Profile</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <strong className="text-amber-950">Full Name:</strong>{" "}
            {user.fullName || user.name}
          </p>
          <p>
            <strong className="text-amber-950">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="text-amber-950">Phone:</strong> {user.phone}
          </p>
          <p>
            <strong className="text-amber-950">Role:</strong> {user.role || "-"}
          </p>
        </div>
      </div>

      {/* Borrowed Books Table */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-amber-950 mb-4">
          Borrowed Books
        </h2>
        {borrows.length === 0 ? (
          <p className="text-gray-500">You have not borrowed any books yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-amber-900 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Book Title</th>
                  <th className="py-3 px-6 text-left">Author</th>
                  <th className="py-3 px-6 text-left">Borrow Date</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-6">{b.bookTitle}</td>
                    <td className="py-3 px-6">{b.bookAuthor}</td>
                    <td className="py-3 px-6">{b.borrowDate}</td>
                    <td className="py-3 px-6">{b.dueDate}</td>
                    <td className="py-3 px-6">
                      {new Date(b.dueDate) < new Date() ? (
                        <span className="text-red-600 font-semibold">
                          Overdue
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
