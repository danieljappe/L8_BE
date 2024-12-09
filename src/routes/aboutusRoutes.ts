import express from 'express';
import AboutusController from "../controllers/aboutusController";
import { asyncHandler } from "../config/asyncHandler";

const router = express.Router();

// Define routes
router.get('/', AboutusController.getAboutUs);
router.put('/', asyncHandler(AboutusController.updateAboutUs));

export default router;
