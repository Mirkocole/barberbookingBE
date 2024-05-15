import { Router } from "express";
import Barber from '../models/barber.model.js'

export const barberRoute = Router();

barberRoute.get('/', async (req,res,next)=>{
    try {
        let barbers = await Barber.find();
        res.send(barbers);
    } catch (error) {
        next(error);
    }
});

barberRoute.get('/:id', async (req,res,next)=>{
    try {
        let id = req.params.id;
        let barbers = await Barber.findById(id);
        res.send(barbers);
    } catch (error) {
        next(error);
    }
});

barberRoute.post('/', async (req,res,next) =>{
    try {
        let barber = await Barber.create(req.body);
        res.send(barber);
    } catch (error) {
        
    }
});

barberRoute.put('/:id', async (req,res,next)=>{
    try {
        let id = req.params.id;
        let barber = await Barber.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.send(barber);
    } catch (error) {
        next(error);
    }
})