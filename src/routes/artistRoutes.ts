import express from "express";
import artistController from "../controllers/artistController";

const router = express.Router();

router.post('/', artistController.createArtist)
router.get('/', artistController.getAllArtists)
router.get('/:id', artistController.getArtistById)

export default router;