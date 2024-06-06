import GoogleStrategy from 'passport-google-oauth2';
import 'dotenv';
import { generateJWT } from './auth.js';
import Client from '../models/client.model.js';
import Barber from '../models/barber.model.js';

const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_CB,
    passReqToCallback: true
}


const googleStrategy = new GoogleStrategy(options, async (req, accessToken, refreshToken, profile, passportNext) => {
    try {
        const { email, family_name, given_name, sub, picture } = profile._json;
        console.log(profile._json);

        // Verifica se l'utente esiste già nel database
        let admin = await Client.findOne({ email });

        if (admin) {
            // L'utente esiste quindi creiamo un Token
            const accToken = await generateJWT({
                _id: admin._id
            })

            // Passiamo al prossimo middleware se tutto ok
            //  il primo argomento è un errore 
            passportNext(null, { accToken })
        } else {
            admin = await Barber.findOne({ email });
            if (admin) {
                // L'utente esiste quindi creiamo un Token
                const accToken = await generateJWT({
                    _id: admin._id
                })

                // Passiamo al prossimo middleware se tutto ok
                //  il primo argomento è un errore 
                passportNext(null, { accToken })
            } else {
                const newAdmin = await Client.create({
                    email: email,
                    name: given_name,
                    lastname: family_name,
                    password: '',
                    avatar: picture,
                    googleId: sub
                });

                const accToken = await generateJWT({
                    id: newAdmin._id
                });
    
                passportNext(null, { accToken });
            }
        }



    } catch (error) {
        passportNext(error);
    }
});

export default googleStrategy;