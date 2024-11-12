import express from "express";
import { v4 as uuidv4 } from 'uuid';
import db from "./models";
import eventRoutes from "./routes/eventRoutes";
import artistRoutes from "./routes/artistRoutes";
import userRoutes from "./routes/userRoutes";
import eventController from "./controllers/eventController";

const app = express();
const port = 420;

app.use(express.json())

app.use('/api/events', eventRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/users', userRoutes)

db.sequelize.sync( { force: true } ).then(async () =>{
    await db.Event.bulkCreate([
        {
            id: uuidv4(),
            title: 'Music Festival',
            description: 'A fun outdoor music festival.',
            date: new Date('2024-12-15T18:00:00'),
            ticketPrice: 50,
            eventPicture: 'music_festival.jpg',
            published: 1,
            billetto_eventId: 'MF2024'
        },
        {
            id: uuidv4(),
            title: 'Art Exhibition',
            description: 'A gallery showcasing local artists.',
            date: new Date('2024-11-20T15:00:00'),
            ticketPrice: 20,
            eventPicture: 'art_exhibition.jpg',
            published: 1,
            billetto_eventId: 'AE2024'
        },
        {
            id: uuidv4(),
            title: 'Tech Conference',
            description: 'A conference with the latest tech trends.',
            date: new Date('2025-01-10T09:00:00'),
            ticketPrice: 100,
            eventPicture: 'tech_conference.jpg',
            published: 0,
            billetto_eventId: 'TC2025'
        }
    ]);

    await db.Artist.bulkCreate([
        {
            id: uuidv4(),
            name: 'Humlecoast Gangsters',
            description: 'Velrygtede hustlere fra østkysten',
            spotify_link: 'www.spotify.com/humlecoast-gangsters'
        },
        {
            id: uuidv4(),
            name: 'Nutcracker Hackers',
            description: 'Nødeknækkere nedstammet fra Humlecoast Gangsters',
            spotify_link: 'www.spotify.com/nutcracker-hackers'
        }
    ])

    await db.User.bulkCreate([
        {
            id: uuidv4(),
            username: "bigD",
            password: "password",
            firstName: "Daniel",
            lastName: "Jappe",
            email: "d@gmail.com",
            phone: "20208517"
        }
    ])

    console.log('Dummy data has been added.');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});