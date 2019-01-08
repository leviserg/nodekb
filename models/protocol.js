let mongoose = require('mongoose');

let protocolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true       
    },
    layer: {
        type: String,
        required: true        
    }
});

let Protocol = module.exports = mongoose.model('protocols', protocolSchema);