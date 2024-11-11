import db from "../models";

const Event = db.Event;

class EventRepository {
    async create(data: any) {
        return Event.create(data);
    }

    async findAll() {
        return Event.findAll();
    }

    async findById(id: string) {
        return Event.findByPk(id);
    }

    async update(id: string, data: any) {
        return Event.update(data, { where: { id } });
    }

    async delete(id: string) {
        return Event.destroy({ where: { id } })
    }
}

export default new EventRepository();