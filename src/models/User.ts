import {DataTypes, Sequelize, Model, Optional, UUID} from "sequelize";

export interface UserAttributes {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserModel
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {}

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserModel>('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        }
    });
    return User;
}