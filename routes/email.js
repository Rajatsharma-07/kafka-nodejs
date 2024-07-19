const express = require('express');
const { kafka } = require('../kafka');
const router = express.Router();

router.post('/email', async (req, res) => {
    try{
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic: 'Send_Emails',
            messages: [{
                key: 'send emails', value: req.body.email_body
            }]
        });
        await producer.disconnect();
        res.status(200).json({message: 'Email Sent Successfully!', success: true});
    }catch(err){
        console.log(err);
    }
})

module.exports = router;