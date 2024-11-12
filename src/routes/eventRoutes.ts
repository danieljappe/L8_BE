import express from "express";
import eventController from "../controllers/eventController";

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

router.get('/:eventId/artists', eventController.getArtistsByEvent);
router.post('/addArtist', eventController.addArtistToEvent);
"TODO: CRUD"

export default router;