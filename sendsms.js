const accountSid = 'AC3a0e1c505cd5f3dcd855d0811ed1d56b';
const authToken = '43163c1b1b01fc7f5eba203907842916';
const fromNumber = '+14438636182';
const toNumber = '+91 63700 81836';

const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body) => {
  let msgOptions = {
    from: fromNumber,
    to: toNumber,
    body: body
  };

  try {
    const message = await client.messages.create(msgOptions);
    console.log(message);
  } catch (error) {
    console.error(error);
  }
};

sendSMS('Hello from Node.js App');
