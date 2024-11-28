import { Request, Response} from "express";
import bcrypt from "bcryptjs"
import { generateToken } from "../config/jwtUtils";
import UserRepository from "../repositories/UserRepository";
import { LoginResponse } from "../types/apiResponse";
import { UserAttributes } from "../models/User";

class UserController {

    async login(req: Request, res: Response): Promise<Response<LoginResponse>> {
        const { username, password } = req.body;

        try {
            const user = await UserRepository.findByUsername(username) as UserAttributes;
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Compare password (assuming bcrypt is used)
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Generate token
            const token = generateToken({
                id: user.id,
                username: user.username,
            });

            // Return response
            return res.status(200).json({
                message: 'Login Successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password, firstName, lastName, email, phone } = req.body;

            // Validate required fields
            if (!username || !password || !firstName || !lastName || !email || !phone) {
                return res.status(400).json({ message: "All fields are required." });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const user = await UserRepository.create({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                phone,
            });

            // Respond with the created user (excluding sensitive fields)
            return res.status(201).json({
                message: "User created successfully",
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Failed to create user", error: error });
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

    async getDashboardData(req: Request, res: Response): Promise<Response> {
        try {
            const user = req.body.user;

            if (!user) {
                return res.status(401).json({ message: "Unauthorized access." });
            }

            return res.status(200).json({
                message: "Welcome to the dashboard",
                user: {
                    id: user.id,
                    username: user.username,
                },
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            return res.status(500).json({ message: "Failed to fetch dashboard data." });
        }
    }


}

export default new UserController();