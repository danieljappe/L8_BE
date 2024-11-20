import db from "../models";
import { UserAttributes, UserCreationAttributes, UserModel } from "../models/User";

const User = db.User;

export class UserRepository {
    /**
     * Create a new user
     * @param data - Data for creating a new user
     * @returns The created user
     */
    async create(data: UserCreationAttributes): Promise<UserModel> {
        return User.create(data);
    }

    /**
     * Find a user by username
     * @param username - The username to search for
     * @returns The found user or null if not found
     */
    async findByUsername(username: string): Promise<UserModel | null> {
        return User.findOne({ where: { username } });
    }

    /**
     * Find a user by ID
     * @param id - The user ID to search for
     * @returns The found user or null if not found
     */
    async findById(id: string): Promise<UserModel | null> {
        return User.findByPk(id);
    }

    /**
     * Get all users
     * @returns A list of all users
     */
    async findAll(): Promise<UserModel[]> {
        return User.findAll();
    }

    /**
     * Update a user by ID
     * @param id - The ID of the user to update
     * @param data - Data to update the user
     * @returns An array where the first element indicates the number of rows updated
     */
    async update(id: string, data: Partial<UserAttributes>): Promise<[number, UserModel[]]> {
        return User.update(data, { where: { id }, returning: true });
    }

    /**
     * Delete a user by ID
     * @param id - The ID of the user to delete
     * @returns A boolean indicating if the user was deleted
     */
    async delete(id: string): Promise<boolean> {
        const deletedRows = await User.destroy({ where: { id } });
        return deletedRows > 0;
    }
}

export default new UserRepository();
