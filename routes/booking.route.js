import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import Booking from '../models/booking.model.js'
import Barber from '../models/barber.model.js'
import Client from '../models/client.model.js'
import { Schema, SchemaType, Mongoose } from "mongoose";

export const bookingRoute = Router();

bookingRoute.get('/', async (req,res,next) =>{
    try {
        let bookings = await Booking.find().populate('barber','client');
        res.send(bookings);
    } catch (error) {
        next(error);
    }
});


bookingRoute.post('/', async(req,res,next) => {
    try {
        
        let newBooking = await Booking.create(req.body);
        if (newBooking) {
            let updateBarber = await Barber.findByIdAndUpdate(req.body.barber,{$push: {bookings : [newBooking._id]}});
            let updateClient = await Client.findByIdAndUpdate(req.body.client,{$push: {bookings: [newBooking._id]}})
        }
        res.send(newBooking);
    } catch (error) {
        next(error);
    }
});

bookingRoute.delete('/:id', async (req,res,next)=>{
    try {
        let result = await Booking.findByIdAndDelete(req.params.id);
        console.log(req.params.id)
        if (result) {
            
            let updateBarber = await Barber.findByIdAndUpdate({ _id: req.body.barber._id }, 
                { $pullAll: { bookings: [req.params.id] } }, 
                { new: true });
            let updateClient = await Client.findByIdAndUpdate({ _id: req.body.client }, 
                { $pullAll: { bookings: [req.params.id] } }, 
                { new: true });
        }
        res.send(result);
    } catch (error) {
        next(error);
    }
})

