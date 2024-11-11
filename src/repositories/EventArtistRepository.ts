import database from '../database';
import { EventArtist } from '../models/EventArtist';

export class EventArtistRepository {
    static async getByEventId(eventId: number): Promise<EventArtist[]> {
        return (await database).all('SELECT * FROM event_artists WHERE eventId = ?', eventId);
    }

    static async create(eventArtist: EventArtist): Promise<EventArtist> {
        const { eventId, artistId } = eventArtist;
        const result = await (await database).run('INSERT INTO event_artists (eventId, artistId) VALUES (?, ?)', eventId, artistId);
        return { eventId, artistId };
    }

    static async delete(eventId: number, artistId: number): Promise<void> {
        await (await database).run('DELETE FROM event_artists WHERE eventId = ? AND artistId = ?', eventId, artistId);
    }
}
