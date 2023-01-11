import {SQSClient} from '@aws-sdk/client-sqs';
import {Consumer} from "sqs-consumer";

const accessKeyId = 'access-key'
const secretAccessKey = 'secret-access-key'
const sessionToken = 'session-token'

const credentials = {
    accessKeyId,
    secretAccessKey,
    sessionToken
}

const queueUrl = `https://sqs.us-east-1.amazonaws.com/987807708973/EmailRelatorioUtilizacaoTag`;

const app = Consumer.create({
    queueUrl,
    handleMessage: async (message) => {
        console.log(message);
    },
    region: 'us-east-1',
    sqs: new SQSClient({
        region: 'us-east-1',
        credentials
    })
});

app.on('error', (err) => {
    console.error('err', err.message);
});

app.on('processing_error', (err) => {
    console.error('processing_error', err.message);
});

app.start();