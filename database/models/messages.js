import mongoose, { Schema } from "mongoose";
import validator from "validator";

const messageSchema = new Schema({
    
    firstName: {
        type: String,
        required: [true, " Veillez mettre votre nom"],
   
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
        enum: ["nom_precise", "autre", "etudiant", "parent"],
        default: "nom_precise",
    },
}, 

{
    timestamps: { createdAt: "created_at" },
}

); 

export default mongoose.model("Message", messageSchema); 