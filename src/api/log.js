const express = require('express');
const router =  express.Router();

const LogEntry = require('../models/logEntry');

router.get("/",(req,res,next)=>{
    LogEntry.find()
        .then((entry) => res.json(entry))
        .catch((error)=>next(error))
})

router.post('/',(req,res,next)=>{
    let logEntry = new LogEntry(req.body);
    logEntry.save()
        .then((logEntry) => res.json(logEntry))
        .catch((error) => {
            if(error.name === 'ValidationError') {
                res.status(422);
            }
            next(error);
        })
})

module.exports=router;