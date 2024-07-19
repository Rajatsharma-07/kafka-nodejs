const { kafka } = require('./kafka');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rajatsharmabkn07@gmail.com',
        pass: 'gxbv crqi fdfu amxt'
    }
});
async function init(){
    console.log('I am called ---> consumer')
    const consumer = kafka.consumer({groupId: 'group-12' });
        await consumer.connect();
        await consumer.subscribe({topics: ['Send_Emails']});
        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                console.log(`--------------------------------: [${topic}]: ${partition}: ${message.value.toString()}`)
                const mailOptions = {
                    from: 'rajatsharmabkn07@gmail.com',
                    to: 'rajatsharmabkn07@gmail.com',
                    subject: 'Hello ✔',
                    text: message.value.toString(),
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            },
        });
}
init();
// module.exports = init;