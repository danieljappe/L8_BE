import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define attributes for the Event model
export interface EventAttributes {
    id: string;
    title: string;
    description?: string;
    date?: Date;
    ticketPrice?: number;
    eventPicture?: string;
    published?: number;
    billetto_eventId?: string;
}

// Add optional attributes for creating a new Event
export interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

// Extend Model from Sequelize with Event attributes
export interface EventModel
    extends Model<EventAttributes, EventCreationAttributes>,
        EventAttributes {}

// Define the Event model
//TODO: Update with location
export default (sequelize: Sequelize) => {
    const Event = sequelize.define<EventModel>('Event', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
        },
        ticketPrice: {
            type: DataTypes.INTEGER,
        },
        eventPicture: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.SMALLINT,
        },
        billetto_eventId: {
            type: DataTypes.STRING,
        },
    });

    return Event;
};
