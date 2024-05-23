import express from 'express'
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { clientRouter } from './routes/client.route.js';
import { barberRoute } from './routes/barber.route.js';
import { authRoute } from './routes/auth.route.js';
import { bookingRoute } from './routes/booking.route.js';


// Attivo la possibilità di accedere ai dati nel file .env
config();

// Creo un server
const server = express();

// Abilito la lettura di file json nelle request
server.use(express.json());

server.use(cors());


// Rotte del server
server.use('/auth', authRoute);
server.use('/client',clientRouter);
server.use('/barber',barberRoute);
server.use('/booking',bookingRoute);

// Inizializzo il server
const initserver = async ()=>{
    try {
        
        // Connessione al database remoto
        mongoose.connect(process.env.MONGO_URL_REMOTE);
    
            console.log('Connesso al Database');
            
            server.listen(process.env.PORT, ()=>{
                console.log('Server in ascolto alla porta '+process.env.PORT)
            })
    } catch (error) {
        console.log('errore di connessione al Database');
    }
}

initserver();