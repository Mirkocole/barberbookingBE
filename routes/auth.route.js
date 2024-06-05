import { Router } from "express";
import  bcrypt  from "bcryptjs";
import Client from '../models/client.model.js'
import Barber from '../models/barber.model.js'
import { generateJWT, verifyJWT, authMiddleware } from "../middlewares/auth.js";


export const authRoute = Router();

authRoute.get('/', async (req,res,next) =>{
    try {
        res.send('login effettuato');
    } catch (error) {
        next(error);
    }
});

// CLIENT REGISTRATION
authRoute.post('/signupClient', async (req,res,next) =>{
    try {
        let userfound = await Client.findOne({email : req.body.email});
        if (userfound) {
            res.status(400).send('Utente già esistente');
        } else {     
            let user = await Client.create({...req.body,password : await bcrypt.hash(req.body.password,10)});   
            res.send(user);
        }
        
    } catch (error) {
        next(error);
    }
});

// BARBER REGISTRATION
authRoute.post('/signupBarber', async (req,res,next) =>{
    try {
        
        
        let userfound = await Barber.findOne({email : req.body.email});
        if (userfound) {  
            res.status(400).send('Utente già esistente');
        } else {     
            
            let barber = await Barber.create({...req.body,password : await bcrypt.hash(req.body.password,10)});
            res.send(barber);
        }

        
    } catch (error) {
        next(error);
    }
});




authRoute.post('/login', async (req,res,next) =>{
    try {
        let userfound  = await Client.findOne({email : req.body.email});

        if (userfound) {
            let passCorrect = await bcrypt.compare(req.body.password,userfound.password);
            if (passCorrect) {
                let token = await generateJWT({_id:userfound._id});
                res.send({user: userfound,token});
            } else {
                res.status(400).send('Password errata');
            }
        } else {
            let userfound2  = await Barber.findOne({email : req.body.email});
            if (userfound2) {
            
                let passCorrect2 = await bcrypt.compare(req.body.password,userfound2.password);
                if (passCorrect2) {
                    let token = await generateJWT({_id:userfound2._id});
                    res.send({user: userfound2,token});
                } else {
                    res.status(400).send('Password errata');
                }
            } else {
                res.status(400).send('User non trovato');
            }
        }

    } catch (error) {
        next(error);
    }
})

authRoute.get('/profile',authMiddleware, async(req,res,next) =>{
    try {
        let user = await Client.findById(req.user._id).populate([{path:'bookings',populate : [{path : 'client'},{path : 'barber'}]},{path:'feedback',populate : [{path : 'barber'}]}]);

        if (user) {
            
            res.send(user);
        } else {
            let barber = await Barber.findById(req.user._id).populate([{path:'bookings',populate : [{path : 'client'},{path : 'barber'}]},{path:'feedback',populate : [{path : 'client'}]}]);
            if (barber) {
                
                res.send(barber);
            } else {
                res.status(404);
            }
        }

    } catch (error) {
        next(error);
    }
})