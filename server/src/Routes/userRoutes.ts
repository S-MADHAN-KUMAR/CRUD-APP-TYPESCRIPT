import express, { Request, Response } from "express";
import { getUsers ,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../Controllers/userController";

const router = express.Router();

router.get("/getUsers", (req: Request, res: Response) =>void getUsers(req, res));
router.post("/createUser", (req: Request, res: Response) =>void createUser(req, res));
router.put("/update/:id", (req: Request, res: Response) =>void updateUser(req, res));
router.delete("/remove/:id", (req: Request, res: Response) =>void deleteUser(req, res));

export default router;

