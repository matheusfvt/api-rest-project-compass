import express from "express";
import userController from "../controllers/userController.js";
import paginatedResults from "../middleware/pagination.js";
import user from "../models/User.js";

const router = express.Router();

router
  .get("/api/v1/users", userController.listarUsers)
  .get("/api/v1/users/list", paginatedResults(user), userController.listarUsersPagination)
  .get("/api/v1/users/search", userController.listarUsersPorNome)
  .get("/api/v1/users/:id", userController.listarUserPorId)
  .post("/api/v1/users", userController.cadastrarUser)
  .put("/api/v1/users/:id", userController.atualizarUser)
  .delete("/api/v1/users/:id", userController.excluirUser);

export default router;
