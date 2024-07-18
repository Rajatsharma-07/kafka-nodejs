const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: 'my-app',
    brokers: ["127.0.0.1:9092"]
});