import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define attributes for the AboutUs model
export interface AboutUsAttributes {
    id: string; // Use UUID for consistency
    content: string; // Stores JSON content from Draft.js
}

// Add optional attributes for creation
export interface AboutUsCreationAttributes extends Optional<AboutUsAttributes, 'id'> {}

// Extend Model with AboutUs attributes
export interface AboutUsModel
    extends Model<AboutUsAttributes, AboutUsCreationAttributes>,
        AboutUsAttributes {}

// Define the AboutUs model
export default (sequelize: Sequelize) => {
    const AboutUs = sequelize.define<AboutUsModel>('AboutUs', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return AboutUs;
};
