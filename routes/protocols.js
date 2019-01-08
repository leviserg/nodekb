const express = require('express');
const router = express.Router();

let myProtocol = require('../models/protocol');
//let myDevice = require('./models/device');

    router.get('/', (req, res) => {
        myProtocol.find((err, data) => {
            if(err){
                return console.error(err);
            }
            else{
                res.render('protocol', {
                    pagetitle:'Industry Standart Protocols',
                    protocols: data
                });
            }
        }).sort({_id:-1});
    });
    // **** add new protocol ****
    router.post('/add', (req, res) => {
        let protocol = new myProtocol();
        protocol.name = req.body.prname;
        protocol.layer = req.body.prlayer;
        protocol.save((err) => {
            if(err){
                console.log(err);
                return false;
            } else {
                req.flash('success', 'Protocol Added');
                res.redirect('/protocol');
            }
        });
    });

    module.exports = router;
