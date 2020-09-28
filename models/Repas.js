const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repasSchema = new Schema({

    date: Date,
    nbr_d_assiettes: Number,
    type_contenant_a_fournir: {
        String,
        enum: ['boite', 'sachet'],
    },
    contenant_ok: Boolean,
    preparateur: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    }

});

const RepasModel = mongoose.model("Repas", repasSchema);

module.exports = RepasModel;