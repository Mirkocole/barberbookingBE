import { ref } from "firebase/database";
import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    data:{
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
        required : true
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