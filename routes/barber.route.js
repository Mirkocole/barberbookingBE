import { Router } from "express";
import Barber from '../models/barber.model.js'
import Client from '../models/client.model.js'
import CloudinaryMiddleware from '../middlewares/multer.js';
import { ObjectId } from "mongodb";

export const barberRoute = Router();

barberRoute.get('/', async (req, res, next) => {
    try {
        let barbers = await Barber.find().populate([{path:'bookings',populate : [{path : 'client'}]},{path:'feedback',populate : [{path : 'client'}]}]);
        res.send(barbers);
    } catch (error) {
        next(error);
    }
});

barberRoute.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let barbers = await Barber.findById(id).populate([{path:'bookings',populate : [{path : 'client'}]},{path:'feedback',populate : [{path : 'client'}]}]);
        res.send(barbers);
    } catch (error) {
        next(error);
    }
});


barberRoute.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let barbers = await Barber.findByIdAndDelete(id);
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


barberRoute.post('/:id/services', async (req, res, next) => {
    try {
        let id = req.params.id;
        let oldBarber = await Barber.findById(id);
        let newService = [...oldBarber.services,req.body]
        oldBarber.services = newService;
        let barber = await Barber.findByIdAndUpdate(id, oldBarber, {
            new: true
        });
        res.send(barber);
    } catch (error) {
        next(error);
    }
})

barberRoute.delete('/:id/services/:idService', async (req, res, next) => {
    try {
        let id = req.params.id;
        let service = req.params.idService;
        let barber = await Barber.findByIdAndUpdate(id, 
        { $pull: { services: { '_id': {$eq: service} } } }, {
            new: true
        });
        res.send(barber);
    } catch (error) {
        next(error);
    }
})

barberRoute.put('/:id/services/:idService', async (req, res, next) => {
    try {
        let id = req.params.id;
        let service = req.params.idService;
        let barber = await Barber.findByIdAndUpdate(id, 
        { $pull: { services: { '_id': {$eq: service} } } }, {
            new: true
        });

        barber = await Barber.findByIdAndUpdate(id, 
            { $push: { services: [req.body] } }, {
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
        if (image) {
            let image = req.file.path;
                 newUser = await Barber.findByIdAndUpdate(req.params.id, { ...req.body.user, avatar: image }, {
                    new: true
                });
                
                res.send(newUser);
            
        } else {
           
        //    console.log(req.body);
            
                 newUser = await Barber.findByIdAndUpdate(req.params.id,req.body, {
                    new: true
                });
                res.send(newUser);
            
        }


    } catch (error) {
        next(error);
    }
})