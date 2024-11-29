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

    async getArtistsByEvent(eventId: string) {
        try {
            const event = await db.Event.findByPk(eventId, {
                include: db.Artist
            });
            return event ? event.Artists : null;
        } catch (error) {
            throw new Error(`Unable to get artists for event`);
        }
    }

    async addArtistToEvent(eventId: string, artistId: string) {
        try {
            const event = await db.Event.findByPk(eventId);
            const artist = await db.Artist.findByPk(artistId);

            if (!event || !artist) {
                throw new Error('Event or Artist not found');
            }

            // Use Sequelize's add method to create an association
            await event.addArtist(artist);
            return { success: true, message: 'Artist successfully added to the event' };
        } catch (error) {
            return { success: false, message: 'Unsuccesful' };
        }
    }

    async removeArtistFromEvent(eventId: string, artistId: string){
        try {
            const event = await db.Event.findByPk(eventId);
            const artist = await db.Artist.findByPk(artistId);

            console.log(event)
            console.log(artist)

            if (!event || !artist) {
                throw new Error('Event or Artist not found');
            }

            await event.removeArtist(artist);
            return { success: true, message: 'Artist successfully removed from the event' };

        } catch (error){
            return { success: false, message: 'Unsuccesful' };
        }
    }
}

export default new EventRepository();