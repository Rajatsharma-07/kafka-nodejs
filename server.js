const express = require('express');
const { kafka } = require('./kafka');
const sendEmail = require('./routes/email');
const routes = require('./routes/route');
const bodyParser = require('body-parser');
// const consumer = require('./consumer');
require('dotenv');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use("/api/v1",routes);
app.use('/api/v1/send', sendEmail);
app.listen(process.env.PORT || 5500, () => {
    console.log(`App is listening on ${process.env.PORT || 5500}`);
});
async function init(){
    try{
        const admin = kafka.admin();
        console.log('Admin Connecting');
        await admin.connect();
        console.log('Admin Connected');
        console.log('Creating topic [send email]');
        await admin.createTopics({
            topics: [
                {
                    topic: 'Send_Emails',
                    numPartitions: 1,
                    replicationFactor: 1
                }    
            ]    
        });    
        console.log('topic created [send email]');
        console.log('Disconnecting Admin');
        await admin.disconnect();
    }catch(err){
        console.error('error: ', err)
    }    
}    

// consumer();
init();