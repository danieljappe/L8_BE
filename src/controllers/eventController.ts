import { Request, Response } from "express";
import EventRepository from "../repositories/EventRepository";

class EventController {

    async createEvent(req: Request, res: Response) {
        try {
            const data = req.body;
            const event = await EventRepository.create(data);
            res.status(201).json(event)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create event'})
        }
    }

    async getAllEvents (req: Request, res: Response) {
        try {
            const events = await EventRepository.findAll();
            res.status(201).json(events)
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all events'})
        }
    }

    async getEventById (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const event = await EventRepository.findById(id)
            if (event) {
                res.status(201).json(event)
            } else {
                res.status(404).json({ message: 'Event not found'})
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error'})
        }
    }

    async updateEvent (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updated = await EventRepository.update(id, data);
            if (updated[0] === 1) {
                res.status(201).json({ message: 'Event updated'})
            } else {
                res.status(404).json({ message: 'Event not found'})
            }
        } catch {
            res.status(500).json({ error: 'Internal server error'})
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

}

export default new EventController();