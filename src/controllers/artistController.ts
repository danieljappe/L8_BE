import { Request, Response } from "express";
import ArtistRepository from "../repositories/ArtistRepository";

class ArtistController {

    async createArtist(req: Request, res: Response) {
        try {
            const data = req.body;
            const artist = await ArtistRepository.create(data);
            res.status(200).json(artist)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create artist'})
        }
    }

    async getAllArtists (req: Request, res: Response){
        try {
            const artists = await ArtistRepository.findAll();
            res.status(200).json(artists)
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all artists'})
        }
    }

    async getArtistById (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const event = await ArtistRepository.findById(id);
            if (event) {
                res.status(200).json(event)
            } else {
                res.status(404).json({ message: 'Event not found'})
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error'})
        }
    }

}

export default new ArtistController();