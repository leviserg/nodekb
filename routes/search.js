const express = require('express');
const router = express.Router();

let myProtocol = require('../models/protocol');
let myDevice = require('../models/device');

router.get('/', (req, res) => {
    // ======= find in base table ======= 
    /*
        myDevice.find({ 'description' : { '$regex' : req.query.searchval, '$options' : 'i' }},
        (err, data) => {
            if(err){
                return console.error(err);
            }
            else{
                res.render('search', {
                    pagetitle:'Search Devices',
                    devices: data
                });
            }
        }).populate('protocol').sort({_id:-1});
    */
    // ======= find in join table {protocols.name} ======= 
    
        myDevice.find({},(err, data) => {    
            if(err){
                return console.error(err);
            }
            else{
                let filteredData = [];
                data.forEach(device => {
                    if(device.protocol!=null){
                        filteredData.push(device);
                    }
                }); 
                
                res.render('search', {
                    pagetitle:'Search Devices',
                    devices: filteredData
                });  
                
            }
        }).
        populate({
            path: 'protocol',
            match: {
              name: { '$regex' : req.query.searchval, '$options' : 'i' }
            },
        }).sort({_id:-1});
    });

    module.exports = router;