const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    lexicalCategory: {
        type: String,
    },
    etymologies: {
        type: String,
    },
    definitions: {
        type: String,
    },
    list: {
        type: String,
    },
    subsenseDef: {
        type: String,
    },
    listtwo: {
        type: String,
    },
    definitionData: {
        type: String,
    },
    listthree: {
        type: String
    }
})

// Creating new collection for the models


const Item = new mongoose.model('Item', itemSchema);

module.exports = Item;