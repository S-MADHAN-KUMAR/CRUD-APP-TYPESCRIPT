import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "../API/userService";

interface UserFormData {
  name: string;
  email: string;
}

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    setMessage("");
    try {
      await createUser(data);
      setMessage("User created successfully!");
      reset();
      navigate("/");
    } catch (error) {
      setMessage("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-y-18 flex-col justify-center items-center min-h-[100vh]">
      <h1 className="text-[#111826] text-6xl font-bold">Create User</h1>
      <div className="min-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 flex flex-col">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
              })}
              type="email"
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
      {message && <p className="text-green-500">{message}</p>}
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 left-2 cursor-pointer shadow-lg bg-gray-900 text-white px-2 py-1.5 rounded min-w-26"
      >
        Back
      </button>
    </div>
  );
};

export default CreateUser;
