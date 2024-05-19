import { Router } from "express";
import Barber from '../models/barber.model.js'
import Client from '../models/client.model.js'
import CloudinaryMiddleware from '../middlewares/multer.js';

export const barberRoute = Router();

barberRoute.get('/', async (req, res, next) => {
    try {
        let barbers = await Barber.find();
        res.send(barbers);
    } catch (error) {
        next(error);
    }
});

barberRoute.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let barbers = await Barber.findById(id);
        res.send(barbers);
    } catch (error) {
        next(error);
    }
});

barberRoute.post('/', async (req, res, next) => {
    try {
        let barber = await Barber.create(req.body);
        res.send(barber);
    } catch (error) {

    }
});

barberRoute.put('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let barber = await Barber.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.send(barber);
    } catch (error) {
        next(error);
    }
})

barberRoute.patch('/:id', CloudinaryMiddleware, async (req, res, next) => {

    try {

        let newUser;
        let image = await req.file?.path;
        console.log(image);
        if (image) {
            console.log('req.file.path');
            let image = req.file.path;
            let isBarber = JSON.parse(req.body.user);
            if (isBarber ) {
                 newUser = await Barber.findByIdAndUpdate(req.params.id, { ...req.body.user, avatar: image }, {
                    new: true
                });
                
                res.send(newUser);
            } else {
                 newUser = await Client.findByIdAndUpdate(req.params.id, 
                    { ...req.body.user, avatar: image }, 
                    { new: true });
                res.send(newUser);
            }
        } else {
           let isBarber = req.body;
        //    console.log(req.body);
            if (isBarber) {
                 newUser = await Barber.findByIdAndUpdate(req.params.id,req.body, {
                    new: true
                });
                res.send(newUser);
            } else {
                 newUser = await Client.findByIdAndUpdate(req.params.id,req.body , {
                    new: true
                });
                res.send(newUser);
            }
        }


    } catch (error) {
        next(error);
    }
})