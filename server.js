import express from 'express'
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { clientRouter } from './routes/client.route.js';
import { barberRoute } from './routes/barber.route.js';
import { authRoute } from './routes/auth.route.js';
import { bookingRoute } from './routes/booking.route.js';
import { feedRoute } from './routes/feedback.route.js';
import session from 'express-session';
import passport from 'passport';
import googleStrategy from './middlewares/passport.js';


// Attivo la possibilità di accedere ai dati nel file .env
config();

// Creo un server
const server = express();

// Abilito la lettura di file json nelle request
server.use(express.json());

const whitelist = ['https://barberbooking-zeta.vercel.app/','http://localhost:3000/'];
const optionsCors = {
    origin : function (origin,callback) {
        if (!origin || whitelist.some((domain)=> origin.startsWith(domain))) {
            callback(null,true);
        } else {
            callback(new Error('not alloweb by cors'));
        }
    }
}


server.use(cors());

server.use(session({
    secret : 'some secret',
    saveUninitialized : false
}));

// Rotte del server
server.use('/auth', authRoute);
server.use('/client',clientRouter);
server.use('/barber',barberRoute);
server.use('/booking',bookingRoute);
server.use('/feedback',feedRoute);


// Google Strategy
passport.use('google', googleStrategy);
server.use(express.json());


server.use(passport.initialize());
server.use(passport.session());



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