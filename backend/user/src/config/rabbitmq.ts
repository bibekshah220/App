import ampq from 'amqplib';

let channel: ampq.Channel;

export const connectRabbitMQ = async () => {
    try {   

const connection = await ampq.connect({
    protocol: 'amqp',
    hostname: process.env.RABBITMQ_HOST,
    port: 5672,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,

})

channel = await connection.createChannel();
console.log('✅Connected to RabbitMQ');


    }     catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }

}
 
export const getRabbitMQChannel = async () => {{
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized. Call connectRabbitMQ first.');
    }   return channel;

    await channel.assertQueue('user_queue', { durable: true });

    channel.sendToQueue('user_queue', Buffer.from(JSON.stringify({ message: 'Hello from User Service!' })), 
    { persistent: true });
}}


