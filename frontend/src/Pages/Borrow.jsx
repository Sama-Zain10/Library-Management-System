// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Components/Shared/AuthContext";

// const Borrow = () => {
//   const { id } = useParams(); 
//   const { user } = useContext(AuthContext); 
//   const navigate = useNavigate();

//   const [book, setBook] = useState(null);
//   const [message, setMessage] = useState("");
//   const [phone, setPhone] = useState(user?.phone || "");

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await fetch(`http://localhost:9090/api/books/${id}`);
//         if (!res.ok) throw new Error("Book not found");
//         const data = await res.json();
//         setBook(data);
//       } catch (err) {
//         setMessage(err.message);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       setMessage("You must be logged in to borrow a book");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:9090/api/borrows/borrow?userId=${user.id}&bookId=${id}`,
//         {
//           method: "POST",
//             headers: {
//     "Authorization": `Bearer ${localStorage.getItem("token")}`
//   }
//            },
        
//       );

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Failed to borrow book");
//       }

//       const data = await res.json();
//       setMessage("Book borrowed successfully!");
//       // نقدر نروح البروفايل مباشرة
//       navigate("/profile");
//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   if (message && message === "Book not found") {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center">
//         <h1 className="text-2xl font-bold">{message}</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
//       {book && (
//         <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
//           <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
//           <p className="mb-2">Author: {book.author}</p>
//           <p className="mb-4">Description: {book.description}</p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//             <input
//               type="text"
//               placeholder="Your Full Name"
//               value={user?.fullName || ""}
//               disabled
//               className="p-3 border rounded-lg w-full bg-gray-100"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={user?.email || ""}
//               disabled
//               className="p-3 border rounded-lg w-full bg-gray-100"
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="p-3 border rounded-lg w-full"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-amber-900 text-white p-3 rounded-xl font-semibold hover:scale-105 transition-all"
//             >
//               Borrow Book
//             </button>
//           </form>
//           {message && <p className="text-red-500 mt-3">{message}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Borrow;

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Shared/AuthContext";

const Borrow = () => {
  const { id } = useParams(); // ID الكتاب
  const { user, token } = useContext(AuthContext); // user و token من Context
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");

  // جلب بيانات الكتاب
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!token) {
          setMessage("You must be logged in to view book details");
          return;
        }

        const res = await fetch(`http://localhost:9090/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Book not found");

        const data = await res.json();
        setBook(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    fetchBook();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      setMessage("You must be logged in to borrow a book");
      return;
    }

    // تحقق من الدور قبل الإرسال
    if (user.role !== "MEMBER") {
      setMessage("Only members can borrow books");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:9090/api/borrows/borrow?userId=${user.id}&bookId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        // تجنب خطأ JSON عند فارغ
        throw new Error(text || "Failed to borrow book");
      }

      setMessage("Book borrowed successfully!");
      navigate("/profile"); // تحويل للبروفايل بعد الاستعارة
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (message && message.includes("Book not found")) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">{message}</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      {book && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="mb-2">Author: {book.author}</p>
          <p className="mb-4">Description: {book.description}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Full Name"
              value={user?.fullName || ""}
              disabled
              className="p-3 border rounded-lg w-full bg-gray-100"
            />
            <input
              type="email"
              placeholder="Email"
              value={user?.email || ""}
              disabled
              className="p-3 border rounded-lg w-full bg-gray-100"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 border rounded-lg w-full"
              required
            />
            <button
              type="submit"
              className="bg-amber-900 text-white p-3 rounded-xl font-semibold hover:scale-105 transition-all"
            >
              Borrow Book
            </button>
          </form>
          {message && <p className="text-red-500 mt-3">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Borrow;
