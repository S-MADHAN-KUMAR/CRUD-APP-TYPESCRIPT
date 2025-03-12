import axios from "axios";

// Define base URL
const API_BASE_URL = "http://localhost:5000/api";

// Define API response types
interface User {
  _id: string;
  name: string;
  email: string;
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_BASE_URL}/getUsers`);
  return response.data;
};

// Get a single user
export const getUserById = async (id: string): Promise<User> => {
  const response = await axios.get<User>(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const response = await axios.post<User>(`${API_BASE_URL}/createUser`, userData);
  return response.data;
};

// Update a user
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await axios.put<User>(`${API_BASE_URL}/update/${id}`, userData);
  console.log(userData);
  
  return response.data;
};

// Delete a user
export const removeUser = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_BASE_URL}/remove/${id}`);
  return response.data;
};
