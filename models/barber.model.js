import { Schema,model } from "mongoose";

const barberSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    barber : {
        type : Boolean,
        default : true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    phone : {
        type: String,
        required : false
    },
    salon:{
        type:String,
        required:false
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
        type:String,
        required : false
    },
    cover:{
        type:String,
        required : false
    },
    services : [{
        name :{ type:String,
            required : false},
        description : {type:String,
            required : false},
        price : {type:Number,
            required : false},
        duration : {
            type:Number,
            required : false
        }
    }],

    bookings:[{
        type: Schema.Types.ObjectId,
        ref:"Booking"
    }]

},{
    timestamps:true,
    collection : 'barber'
});

export default model('Barber',barberSchema);