import mongoose, { Schema } from "mongoose";

import { errorRequiredMessage } from "#database/error-messages.js";

const saeSchema = new Schema({
    title: {
        type: String,
        required: [
            true,
            errorRequiredMessage("Veuillez mettre un titre, le champ ne peut pas être nul ou vide"),
        ],
        trim: true,
    },
    content: {
        type: String,
        maxlength: [
            200,
            'Le champ "contenu" ne peut pas dépasser 200 caractères',
        ],
        trim: true,
    },
    image: String,
});

saeSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("SAE", saeSchema);
