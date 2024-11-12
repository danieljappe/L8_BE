import db from "../models";

const Artist = db.Artist;

class ArtistRepository {

    async create(data: any) {
        return Artist.create(data);
    }

    async findAll() {
        return Artist.findAll();
    }

    async findById(id: string) {
        return Artist.findByPk(id);
    }

    async update(id: string, data: any) {
        return Artist.update(data, { where: { id } });
    }

    async delete(id: string) {
        return Artist.destroy({ where: { id } })
    }
}

export default new ArtistRepository();