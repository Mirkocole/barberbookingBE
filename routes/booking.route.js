import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import Booking from '../models/booking.model.js'
import Barber from '../models/barber.model.js'
import Client from '../models/client.model.js'

export const bookingRoute = Router();

bookingRoute.get('/', async (req,res,next) =>{
    try {
        let bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        next(error);
    }
});


bookingRoute.post('/', async(req,res,next) => {
    try {
        
        let newBooking = await Booking.create(req.body);
        if (newBooking) {
            let updateBarber = await Barber.findByIdAndUpdate(req.body.barber,{bookings : [newBooking._id]});
            let updateClient = await Client.findByIdAndUpdate(req.body.client,{bookings: [newBooking._id]})
        }
        res.send(newBooking);
    } catch (error) {
        next(error);
    }
});

