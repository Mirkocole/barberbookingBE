import { Schema, model } from "mongoose";

const clientSchema = new Schema({

    name : {
        type: String,
        required : true
    },
    lastname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : false
    },
    phone : {
        type: String,
        required : false
    },
    address : {
        street : {
            type: String,
            required : false
        },
        postalCode : {
            type: String,
            required : false
        },
        city : {
            type: String,
            required : false
        },
        country : {
            type: String,
            required : false
        },
        countryCode : {
            type: String,
            required : false
        },
        
    },
    avatar:{
        type:String
    },
    feedback: [{
        type: Schema.Types.ObjectId,
        ref: "Feedback"
    }],
    bookings:[{
        type: Schema.Types.ObjectId,
        ref:"Booking"
    }]

},{
    timestamps:true,
    collection : 'clients'
});

export default model('Client',clientSchema);