import express from "express";
import eventController from "../controllers/eventController";
import {authenticateJWT} from "../config/authMiddleware";
import { asyncHandler } from "../config/asyncHandler";

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

router.get('/:eventId/artists', eventController.getArtistsByEvent);
router.post('/addArtist', asyncHandler(eventController.addArtistsToEvent));
router.delete(
    '/:eventId/artists/:artistId',
    authenticateJWT,
    eventController.removeArtistFromEvent);

export default router;