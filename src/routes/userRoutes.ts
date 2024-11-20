import express from "express";
import userController from "../controllers/UserController";
import { asyncHandler } from "../config/asyncHandler";

const router = express.Router();

router.post('/create', asyncHandler(userController.createUser))
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.post('/login', asyncHandler(userController.login))

export default router;