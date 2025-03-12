import axios from "axios";

// Define base URL
const API_BASE_URL = "https://crud-app-typescript-server.onrender.com/api";

// Define API response types
interface User {
  _id: string;
  name: string;
  email: string;
}


export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_BASE_URL}/getUsers`);
  return response.data;
};

export const createUser = async (userData: Omit<User, "_id">): Promise<User> => {
  const response = await axios.post<User>(`${API_BASE_URL}/createUser`, userData);
  return response.data;
};


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
