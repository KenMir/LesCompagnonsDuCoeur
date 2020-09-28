const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maraudeSchema = new Schema({
    date: String,
    lieu: {
        numRue: Number,
        nomRue: String,
        ville: String,
        code_postal: Number,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
});

const MaraudeModel = mongoose.model("Maraude", maraudeSchema);

module.exports = MaraudeModel;