import express from "express";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import db from "./models";
import eventRoutes from "./routes/eventRoutes";
import artistRoutes from "./routes/artistRoutes";
import userRoutes from "./routes/userRoutes";
import aboutusRoutes from "./routes/aboutusRoutes";

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
app.use('/api/about', aboutusRoutes)

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
            description: 'Event 4: Humlecoast - Celebrating Humlebæk’s Underground Rap Scene\n' +
                '\n' +
                'Welcome to Event 4: Humlecoast, a tribute to the raw and unapologetic spirit of Humlebæk’s vibrant underground rap game. This event brings together the pulse of Humlebæk’s streets, the energy of its local talent, and the unique soundscapes that have defined a community rich in culture and creativity.\n' +
                '\n' +
                'Humlecoast Gangsters\n' +
                'At the heart of this movement is Humlecoast Gangsters, a collective that has transformed local rap into anthems of resilience, pride, and street smarts. With tracks like "Juu Brisen", a gritty ode to coastal life, and "Shorecoast Gangsters", which perfectly captures the unity of their crew, the Gangsters have solidified their place as Humlebæk legends. Their hit "Hele Vejen" is an anthem of ambition and persistence, while the iconic "Wahtimus Prime" — the Humlecoast anthem — blends sharp lyricism with a beat that gets crowds roaring.\n' +
                '\n' +
                'Nutcracker Hackers\n' +
                'Adding another layer to the Humlecoast sound is Nutcracker Hackers, a subgroup of the Humlecoast Gangsters. Known for their eccentric style and genre-defying lyrics, Nutcracker Hackers have redefined what it means to experiment with underground rap. Tracks like "GTA Demon Time" and "Mango Træet" showcase their dynamic storytelling and playful wordplay. Songs like "Spiderman til Rastalavn", with its quirky references and infectious rhythm, have become party staples. But it’s their magnum opus, "Nutcracker Enterprise", that cements their reputation as visionaries within the underground scene.\n' +
                '\n' +
                'The Spirit of Humlecoast\n' +
                'This event isn’t just about music—it’s about celebrating the culture that has turned Humlebæk into a hub for creativity and underground innovation. Expect live performances, exclusive drops from both groups, and a deep dive into the stories behind the songs. Whether you’re a die-hard fan or a newcomer, Event 4: Humlecoast promises an unforgettable journey into the soul of Humlebæk’s rap game.\n' +
                '\n' +
                'Prepare for a night of beats, bars, and the unbreakable bond of Humlecoast.',
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