import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";


class UserController {

    async createUser(req: Request, res: Response) {
        try {
            const data = req.body;
            const user = await UserRepository.create(data);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user'})
        }
    }

    async getAllUsers (req: Request, res: Response){
        try {
            const users = await UserRepository.findAll();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all users'})
        }
    }

    async getUserById (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await UserRepository.findById(id);
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'User not found'})
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

    async updateUser (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updated = await UserRepository.update(id ,data);
            if (updated[0] === 1) {
                res.status(200).json({message: 'User updated'})
            } else {
                res.status(404).json({message: 'User not found'})
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

    async deleteUser (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deleted = await UserRepository.delete(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User not found'})
            }
        } catch (error) {
            res.status(500).json({ error: `Internal server error: ${error}`})
        }
    }

}

export default new UserController();