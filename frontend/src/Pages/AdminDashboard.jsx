import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Shared/AuthContext";

export default function AdminDashboard() {
  const { user, token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  /* ===================== ADD USER ===================== */
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  /* ===================== EDIT USER ===================== */
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUser, setEditUser] = useState({
    fullName: "",
    email: "",
    role: "MEMBER",
  });

  /* ===================== AUTH CHECK ===================== */
  useEffect(() => {
    if (!user || !token) {
      setError("You must be logged in as admin.");
      return;
    }

    if (user.role !== "ADMIN") {
      setError("You do not have permission to access this page.");
      return;
    }

    fetchUsers();
  }, [user, token]);

  /* ===================== FETCH USERS ===================== */
  async function fetchUsers() {
    try {
      const res = await fetch("http://localhost:9090/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== ADD USER ===================== */
  async function handleAddUser(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Failed to add user");

      setNewUser({
        fullName: "",
        email: "",
        password: "",
        role: "MEMBER",
      });

      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== DELETE USER ===================== */
  async function handleDeleteUser(userId) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:9090/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== EDIT USER ===================== */
  function startEdit(u) {
    setEditingUserId(u.id);
    setEditUser({
      fullName: u.fullName,
      email: u.email,
      role: u.role,
    });
  }

  function cancelEdit() {
    setEditingUserId(null);
  }

  async function saveEdit(userId) {
    try {
      const res = await fetch(
        `http://localhost:9090/api/admin/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editUser),
        }
      );

      if (!res.ok) throw new Error("Failed to update user");

      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  /* ===================== ERROR ===================== */
  if (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  /* ===================== UI ===================== */
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-amber-950 mb-6">
        Admin Dashboard
      </h1>

      {/* ===================== ADD USER FORM ===================== */}
      <form
        onSubmit={handleAddUser}
        className="bg-white shadow-md p-4 rounded-lg mb-8 max-w-xl"
      >
        <h2 className="text-xl font-bold mb-3">Add New User</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Full Name"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          required
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />

        <select
          className="border p-2 w-full mb-3"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="MEMBER">MEMBER</option>
          <option value="LIBRARIAN">LIBRARIAN</option>
        </select>

        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>

      {/* ===================== USERS TABLE ===================== */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-amber-900 text-white">
            <tr>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">
                  {editingUserId === u.id ? (
                    <input
                      className="border p-1"
                      value={editUser.fullName}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          fullName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    u.fullName
                  )}
                </td>

                <td className="p-3">
                  {editingUserId === u.id ? (
                    <input
                      className="border p-1"
                      value={editUser.email}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>

                <td className="p-3">
                  {editingUserId === u.id ? (
                    <select
                      className="border p-1"
                      value={editUser.role}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="MEMBER">MEMBER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>

                <td className="p-3 flex gap-2">
                  {editingUserId === u.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(u.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(u)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
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
