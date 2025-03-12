import React, { useEffect, useState } from "react";
import { getUsers, removeUser, updateUser } from "../API/userService"; // Import API functions
import { useNavigate } from "react-router-dom";

// Define User type
interface User {
  _id: string;
  name: string;
  email: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null); // Holds user being edited
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    if (!userId) return;

    try {
      console.log("Removing user with ID:", userId);
      await removeUser(userId);

      fetchUsers(); // Refresh users list after deletion
    } catch (error) {
      setError("Failed to remove user.");
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user); // Set the selected user for editing
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      await updateUser(editingUser._id, editingUser); // Send update request
      setEditingUser(null); // Close edit form
      fetchUsers(); // Refresh list
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center text-center p-10 gap-y-18">
      <h1 className="text-[#111826] text-6xl font-bold">Users List</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full h-full">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-6 border-2 border-dashed border-gray-400 h-fit shadow-sm hover:scale-105 duration-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex text-sm justify-between mt-8">
                <button
                  onClick={() => handleEditUser(user)}
                  className="cursor-pointer shadow-lg bg-blue-900 text-white px-2 py-1.5 rounded min-w-26"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="cursor-pointer shadow-lg bg-gray-900 text-white px-2 py-1.5 rounded min-w-26"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </main>
      )}

      {/* Edit Form - Appears When Editing User */}
      {editingUser && (
        <div className="bg-black/20 fixed justify-center items-center flex w-full h-full top-0 left-0">
          <div className=" bg-white p-6 shadow-lg rounded-lg w-2/6 flex flex-col gap-y-4">
          <h2 className="text-4xl font-bold mb-4">Edit User</h2>
          <div className="text-left">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            className="border p-2 w-full mb-2"
            placeholder="Name"
          />
          </div>
          <div className="text-left">
          <label className="block text-gray-700">email:</label>
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            className="border p-2 w-full mb-2"
            placeholder="Email"
          />
          </div>
          <div className="flex gap-2 w-full justify-between">
            <button
              onClick={handleUpdateUser}
             className="cursor-pointer shadow-lg bg-blue-900 text-white px-2 py-1.5 rounded min-w-26"
            >
              Update
            </button>
            <button
              onClick={() => setEditingUser(null)}
               className="cursor-pointer shadow-lg bg-gray-900 text-white px-2 py-1.5 rounded min-w-26"
            >
              Cancel
            </button>
          </div>
        </div>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="absolute top-2 left-2 cursor-pointer shadow-lg bg-gray-900 text-white px-2 py-1.5 rounded min-w-26"
      >
        Back
      </button>
    </div>
  );
};

export default UsersList;
