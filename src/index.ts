import express from "express";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import db from "./models";
import eventRoutes from "./routes/eventRoutes";
import artistRoutes from "./routes/artistRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 5000;
app.use(cors());

app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:3000', // Only allow requests from localhost:3000
    })
);

app.use('/api/events', eventRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/users', userRoutes)

db.sequelize.sync( { force: true } ).then(async () =>{
    await db.Event.bulkCreate([
        {
            id: uuidv4(),
            title: 'Event 1 - Sydhavnen',
            description: 'Første event i Sydhavnen, bla bla bla.',
            date: new Date('2024-03-23T20:00:00'),
            location: 'Sydhavn',
            ticketPrice: 50,
            eventPicture: 'music_festival.jpg',
            published: 1,
            billetto_eventId: 'MF2024'
        },
        {
            id: uuidv4(),
            title: 'Event 2 - Kargo',
            description: 'Vi elsker kargo, mega nice folk bag det.',
            date: new Date('2024-08-03T20:00:00'),
            location: 'Nordhavn',
            ticketPrice: 60,
            eventPicture: 'art_exhibition.jpg',
            published: 1,
            billetto_eventId: 'AE2024'
        },
        {
            id: uuidv4(),
            title: 'Skomager Release Party',
            description: 'Skomager kommer og laver sko.',
            date: new Date('2024-10-11T21:00:00'),
            location: 'Krudttønden',
            ticketPrice: 100,
            eventPicture: 'tech_conference.jpg',
            published: 0,
            billetto_eventId: 'TC2025'
        },
        {
            id: uuidv4(),
            title: 'Event 3 - Basement',
            description: 'En tur i kælderen >:).',
            date: new Date('2024-11-07T21:00:00'),
            location: 'Vesterbro',
            ticketPrice: 100,
            eventPicture: 'tech_conference.jpg',
            published: 0,
            billetto_eventId: 'TC2025'
        },
        {
            id: uuidv4(),
            title: 'Event 4 - Humlecoast',
            description: 'Homecoming til humlecoast',
            date: new Date('2025-01-10T21:00:00'),
            location: 'Humlecoast',
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
            id: "c3355147-122b-4764-b1e3-1d5b6eba3fe0",
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