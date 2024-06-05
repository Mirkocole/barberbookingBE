import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import Feedback from "../models/feedback.model.js";
import Barber from '../models/barber.model.js'
import Client from '../models/client.model.js'

export const feedRoute = Router();

feedRoute.get('/',authMiddleware, async (req,res,next)=>{
    try {
        let result = await feedbackModel.find().populate('barber','client');
        res.send(result);
    } catch (error) {
        next(error);
    }
} );

feedRoute.get('/:id',authMiddleware, async (req,res,next)=>{
    try {
        let result = await Feedback.findById(req.params.id).populate('barber','client');
        res.send(result);
    } catch (error) {
        next(error);
    }
});

feedRoute.post('/',authMiddleware, async (req,res,next)=>{
    try {
        let feed = await Feedback.create(req.body);
        if (feed) {
            let feedbarber = await Barber.findByIdAndUpdate(feed.barber,{$push: {feedback : [feed._id]}});
            let feedclient = await Client.findByIdAndUpdate(feed.client,{$push: {feedback : [feed._id]}});
        }
        res.send(feed);
    } catch (error) {
        next(error);
    }
})