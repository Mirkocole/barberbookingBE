import { Router } from "express";
import Client from '../models/client.model.js'
import CloudinaryMiddleware from '../middlewares/multer.js';

export const clientRouter = Router();


// GET ALL CLIENTS
clientRouter.get('/', async (req, res, next) => {
    try {
        let users = await Client.find();
        res.send(users);
    } catch (error) {
        next(error);
    }
});


// GET SINGLE CLIENT
clientRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await Client.findById(id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});


// CREATE CLIENT
// clientRouter.post('/', async (req,res,next)=>{
//     try {
//         let userfound = await Client.findOne({email : req.body.email});
//         if (userfound) {
//             res.status(400).send('Utente già esistente');
//         } else {

//             let client = await Client.create(req.body);
//             res.send(client);
//         }
//     } catch (error) {
//         next(error);
//     }
// })


// DELETE SINGLE CLIENT
clientRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await Client.findByIdAndDelete(id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});


// PUT SINGLE CLIENT
clientRouter.put('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await Client.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.send(user);
    } catch (error) {
        next(error);
    }
});


clientRouter.patch('/:id', CloudinaryMiddleware, async (req, res, next) => {
    try {

        let newUser;
        if (req.file) {
            let image = req.file.path;
            
                newUser = await Client.findByIdAndUpdate(req.params.id,
                    { ...req.body.user, avatar: image },
                    { new: true });
                res.send(newUser);
            
        } else {
            
                newUser = await Client.findByIdAndUpdate(req.params.id, req.body, {
                    new: true
                });
                res.send(newUser);
            
        }

    } catch (error) {
        next(error);
    }
})