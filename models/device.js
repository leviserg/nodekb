let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let deviceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    protocol: {
        type: Schema.Types.ObjectId,
        ref: 'protocols',
        required: true
    },
    description: {
        type: String,
        required: true        
    },
    date_:{
        type: String,
        required:true
    }
});

let Device = module.exports = mongoose.model('devices', deviceSchema);
