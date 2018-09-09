import base64 from 'base-64'

const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

const planningCenterHeaders = new Headers();
planningCenterHeaders.append("Authorization", "Basic " + base64.encode(`${APP_ID}:${APP_SECRET}`));

export const postRequest = (url, successHandler, errorHandler, body, headers) => {
  fetch(url, {
    headers: headers ? headers : planningCenterHeaders,
    method: 'POST',
    body: body
  })
  .then(res => res.json())
  .then(res => {
    if (res) {
      console.log('success');
      successHandler(res);
    } else {
      console.log('error');
      errorHandler();
    }
  })
  .catch(err => {
    console.log(err);
    errorHandler();
  })
}
