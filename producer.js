const { kafka } = require('./kafka');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
async function init() {
    const producer = kafka.producer();
    await producer.connect();
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', async function (line) {
        const [riderName, location] = line.split(' ');
        let part = -1;
        if (location.toLowerCase() === 'north') {
            part = 0;
        } else if (location.toLowerCase() === 'south') {
            part = 1;
        } else {
            part = 2; // default partition for other locations
        }
        console.log(part);
        await producer.send({
            topic: 'location_update',
            messages: [
                {
                    key: 'location-update', value: JSON.stringify({ name: riderName, location }), partition: part
                }
            ]
        });
    }).on('close', async () => {
        await producer.disconnect();
    })
}

init();