import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes";
import connectDB from "./Config/MongoDB";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()

// Routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
