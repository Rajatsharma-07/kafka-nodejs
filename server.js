const express = require('express');
const { kafka } = require('./kafka');
require('dotenv');
const app = express();
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
                    topic: 'location_update',
                    numPartitions: 3,
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
app.listen(process.env.PORT || 5500, () => {
    console.log(`App is listening on ${process.env.PORT || 5500}`);
});

init();