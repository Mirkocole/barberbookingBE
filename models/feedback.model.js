import { Schema, model } from "mongoose";

const feedSchema = new Schema({

    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    barber: {
        type: Schema.Types.ObjectId,
        ref: "Barber",
        required: true
    },
    value : {type: Number, required: true},
    message: {
        type:String,
        required: false
    }

},{
    timestamps:true,
    collection : 'feedback'
});

export default model('Feedback',feedSchema);