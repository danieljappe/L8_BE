import { UserRepository } from '../src/repositories/UserRepository'
import {describe} from "node:test";
import User from "../src/models/User";
import {randomUUID} from "node:crypto";

describe('UserRepository', () => {
    let userRepository: UserRepository

    const userData = {
        id: randomUUID(),
        username: "username",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        email: "test@test.com",
        phone: "12345678"
    };

    beforeAll(async () => {
        userRepository = new UserRepository();
    })

    test('return all users', async () => {
        const result = await userRepository.findAll();
        expect(result).toHaveLength(1)
    })

    test('create user and find it', async () => {
        const createdUser = await userRepository.create(userData);

        expect(createdUser).toMatchObject({
            id: userData.id,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
        })

        // Find the created user
        const fetchedUser = await userRepository.findById(userData.id);
        expect(fetchedUser).toMatchObject({
            id: userData.id,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
        });
    });

    // test('Delete user', async () => {
    //     await userRepository.create(userData);
    //
    //     const deletedUser = await userRepository.delete(userData.id);
    //
    //     expect(deletedUser).toBeNull()
    // })


})