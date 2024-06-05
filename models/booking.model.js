import { ref } from "firebase/database";
import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    start:{
        type : Date,
        required : true
    },
    end:{
        type : Date,
        required : true
    },
    barber : {
        type : Schema.Types.ObjectId,
        ref : "Barber",
        required : true
    },
    client : {
        type : Schema.Types.ObjectId,
        ref : "Client",
        required : false
    },
    title:{
        type:String,
        required : false
    },
    services:[
        {
            name:{ type:String },
            duration: {type: Number}
        }
    ]
},{
    timestamps:true,
    collection : 'bookings'
});

export default model('Booking',bookingSchema);