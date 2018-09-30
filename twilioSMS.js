//make sure to npm install trilio

const accountSid = 'AC431de3e54578cda4970ee1bdcf812b7f';
const authToken = '6e5e193f63295b2411536952899ff3a6';

var twilio = require('twilio');
const client = new twilio(accountSid, authToken);

var medications = ['advil', 'ambian', 'antibiotics']
var med_list = medications.join(', ');


client.messages.create({
    body:'Remember to take the following medications at 8:00: '+ med_list + '\n\nYour prescription for ' + medications[0] + ' is low. Make sure to refill this week.\nReply if you would like to send your refill to your local pharmacist.',
    to:'+19089305860',
    from:'+19294639883'
 })
.then((message) => console.log(message.sid));