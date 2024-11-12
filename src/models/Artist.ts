import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define attributes for the Artist model
export interface ArtistAttributes {
    id: string;
    name: string;
    description?: string;
    spotify_link?: string;
}

// Add optional attributes for creating a new Artist
export interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id'> {}

// Extend Model from Sequelize with Artist attributes
export interface ArtistModel
    extends Model<ArtistAttributes, ArtistCreationAttributes>,
        ArtistAttributes {}

// Define the Artist model
export default (sequelize: Sequelize) => {
    const Artist = sequelize.define<ArtistModel>('Artist', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        spotify_link: {
            type: DataTypes.STRING,
        },
    });

    return Artist;
};
