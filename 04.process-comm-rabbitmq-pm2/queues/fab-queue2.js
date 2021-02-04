const rq = require("amqplib/callback_api");

const fabObj = require("../fibonacci-series");


function sendValueInFabQueue2(num) {
    rq.connect("amqp://localhost", ((err, connection)=>{
        if(err) connection.exit();
        const queueName = "FabSeries2";
        connection.createChannel((error, channel)=>{
            if(error){
                console.log(error);
                process.exit()
            }
            else{
                let fabNum = fabObj.calculateFibonacciValue(num);
                // checks for <queueName> queue, 
                // if it doesn't exist then it will create one
                channel.assertQueue(queueName, {durable: false})
                channel.sendToQueue(queueName, Buffer.from(fabNum.toString()));
                console.log(`Queue name is - ${queueName}`);
            }
        })
    }))
}

module.exports = sendValueInFabQueue2;