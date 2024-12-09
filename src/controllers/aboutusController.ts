import { Request, Response } from 'express';
import AboutUsRepository from '../repositories/AboutUsRepository';

class AboutUsController {
    async getAboutUs(req: Request, res: Response) {
        try {
            const aboutUs = await AboutUsRepository.find();
            if (aboutUs) {
                res.status(200).json(aboutUs);
            } else {
                res.status(404).json({ message: 'About Us content not found' });
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}` });
        }
    }

    async updateAboutUs(req: Request, res: Response) {
        try {
            console.log('Request Body:', req.body); // Debug log
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ message: 'Content is required' });
            }

            const updated = await AboutUsRepository.createOrUpdate(content);
            res.status(200).json(updated);
        } catch (error) {
            console.error('Error updating About Us:', error); // Debug log
            res.status(500).json({ error: `Internal server error: ${error}` });
        }
    }


}

export default new AboutUsController();
