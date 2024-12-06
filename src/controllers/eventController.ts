import { Request, Response } from "express";
import EventRepository from "../repositories/EventRepository";

class EventController {

    async createEvent(req: Request, res: Response) {
        try {
            const data = req.body;
            const event = await EventRepository.create(data);
            res.status(200).json(event)
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

    async getAllEvents (req: Request, res: Response) {
        try {
            const events = await EventRepository.findAll();
            res.status(200).json(events)
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all events'})
        }
    }

    async getEventById (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const event = await EventRepository.findById(id)
            if (event) {
                res.status(200).json(event)
            } else {
                res.status(404).json({ message: 'Event not found'})
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

    async updateEvent (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updated = await EventRepository.update(id, data);
            if (updated[0] === 1) {
                res.status(200).json({ message: 'Event updated'})
            } else {
                res.status(404).json({ message: 'Event not found'})
            }
        } catch (error){
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

    async deleteEvent(req: Request, res: Response) {
        const id = req.params.id;
        const deleted = await EventRepository.delete(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    }

    async getArtistsByEvent(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const artists = await EventRepository.getArtistsByEvent(eventId);
            if (artists) {
                res.status(200).json(artists);
            } else {
                res.status(404).json({ message: 'No artists found for the given event'})
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

    async addArtistsToEvent(req: Request, res: Response) {
        const { eventId, artistIds } = req.body;

        if (!eventId || !artistIds || !Array.isArray(artistIds)) {
            return res.status(400).json({ message: 'Invalid request. Ensure eventId and artistIds are provided.' });
        }

        try {
            const results = await EventRepository.addArtistsToEvent(eventId, artistIds);

            const failed = results.filter((result) => !result.success);
            if (failed.length > 0) {
                res.status(207).json({
                    message: 'Some artists were not added successfully.',
                    results,
                });
            } else {
                res.status(200).json({ message: 'All artists successfully added to the event.', results });
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}` });
        }
    }


    async removeArtistFromEvent(req: Request, res: Response) {
        const { eventId, artistId } = req.params;

        try {
            const result = await EventRepository.removeArtistFromEvent(eventId, artistId);

            if (result!.success) {
                res.status(200).json({ message: result!.message })
            } else {
                res.status(404).json({ message: result!.message })
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

}

export default new EventController();