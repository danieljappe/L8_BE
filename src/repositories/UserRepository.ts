import db from "../models"

const User = db.User;

class UserRepository {

    async create(data: any) {
        return User.create(data);
    }

    async findAll() {
        return User.findAll();
    }

    async findById(id: string) {
        return User.findByPk(id);
    }

    async update(id: string, data: any) {
        return User.update(data, { where: { id } });
    }

    async delete(id: string) {
        return User.destroy({ where: { id } })
    }
}

export default new UserRepository();