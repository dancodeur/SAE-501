import mongoose, { Schema } from "mongoose";
import validator from "validator";

const messageSchema = new Schema({    
    lastName: {
        type: String,
        required: [true, " Veillez mettre votre nom"],
   
    },
    firstName: {
        type: String,
        required: [true, " Veillez mettre votre pénom"],
   
    },
    email: {
        type: String,
        validate: [validator.isEmail, "E-mail"],
        required: [true, " Veillez mettre votre nom"],
    },
    content: {
        type: String,
        required: [true, "Veillez un email"],
    },
    identity: {
        type: String,
        enum: ["non_precise", "autre", "etudiant", "parent"],
        default: "non_precise",
    },
}, 

{
    timestamps: { createdAt: "created_at" },
}

); 

export default mongoose.model("Message", messageSchema); 
