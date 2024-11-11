import { DataTypes, Sequelize, Model, ModelStatic } from 'sequelize';

export default (sequelize: Sequelize): ModelStatic<Model> => {
    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
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
