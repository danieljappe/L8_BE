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

    async addArtistsToEvent(eventId: string, artistIds: string[]) {
        try {
            const event = await db.Event.findByPk(eventId);

            if (!event) {
                throw new Error('Event not found');
            }

            const results = await Promise.all(
                artistIds.map(async (artistId) => {
                    const artist = await db.Artist.findByPk(artistId);

                    if (!artist) {
                        return { success: false, message: `Artist with ID ${artistId} not found` };
                    }

                    await event.addArtist(artist);
                    return { success: true, message: `Artist ${artistId} added successfully` };
                })
            );

            return results;
        } catch (error) {
            console.error('Error adding artists to event:', error);
            throw new Error('Failed to add artists to event');
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