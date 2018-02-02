let config = require('../config/environment');
let request = require('request');
import Promise from 'bluebird';
import moment from 'moment';
// PUt this to ../config/environment

export function sendSMS(message, number) {
  // ref-id="2008-10-15 10:05:05"
  let now = moment().format('YYYY-MM-DD HH:mm:ss');
  return new Promise((resolve, reject) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    request
      .post(
        {
          url: config.sms.url,
          body: `
            <bulk-request login="${config.sms.login}"
                          password="${config.sms.password}"
                          ref-id="${now}"
                          delivery-notification-requested="true"
                          version="1.0">
                <message id="${getRandomInt(10000000000000, 100000000000000/* one zero more :D*/)}"
                         msisdn="${number}"
                         service-number="${config.sms.title}"
                         defer-date="${now}"
                         validity-period="3"
                         priority="1">
                    <content type="text/plain">${message}</content>
                </message>
            </bulk-request>
          `,
          headers: {'Content-Type': 'text/xml'}
        },
        (err, response, body) => {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          if (err || response.statusCode !== 200) {
            return reject(new Error(err));
          }
          return resolve(response, body);
        });
  });
}

export function sendPasswordViaSMS(password, number) {
  let message = `Your Voto password is: ${password}`;
  return sendSMS(message, number);
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
