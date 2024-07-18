const express = require('express');
const { kafka } = require('./kafka');
require('dotenv');
const app = express();
app.listen(process.env.PORT || 5500, () => {
    console.log(`App is listening on ${process.env.PORT || 5500}`);
});

async function init(){
    const admin = kafka.admin();
    console.log('Admin Connecting');
    admin.connect();
    console.log('Admin Connected');
    console.log('Creating topic [send email]');
    await admin.createTopics({
        topics: [
            {
                topic: 'send_email',
            }
        ]
    })
    console.log('topic created [send email]');
    console.log('Disconnecting Admin');
    admin.disconnect();
}
init();