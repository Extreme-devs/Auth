import { Router } from "express";

const router = Router();

import userRoutes from "./routes/user.routes";

router.use("/users", userRoutes);
router.get("/", (req, res) => {
  res.send("Server is running!");
});

export default router;
