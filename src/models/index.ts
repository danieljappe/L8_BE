import { Sequelize, DataTypes } from 'sequelize';
import { readdirSync } from 'fs';
import { join } from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/L8_DB.db'
});

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import all models
readdirSync(__dirname)
    .filter((file) => file !== 'index.ts' && file.endsWith('.ts'))
    .forEach((file) => {
        const model = require(join(__dirname, file)).default;
        if (model) {
            const initializedModel = model(sequelize, DataTypes);
            db[initializedModel.name] = initializedModel;
        }
    });

console.log('Loaded models: ', Object.keys(db))


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Define relationships between models
db.Event.belongsToMany(db.Artist, { through: 'EventArtist' });
db.Artist.belongsToMany(db.Event, { through: 'EventArtist' });

export default db;
