
import base64 from 'base-64'

const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

const PLANNING_CENTER_HEADERS = new Headers();
PLANNING_CENTER_HEADERS.append("Authorization", "Basic " + base64.encode(`${APP_ID}:${APP_SECRET}`));

export const postRequest = (url, successHandler, errorHandler, body, headers) => {
  fetch(url, {
    headers: headers ? headers : PLANNING_CENTER_HEADERS,
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

const SHEETS_URL = process.env.FORM_SHEETS_URL;
const RESPONSE_KEYS = [
  'type',
  'firstName',
  'lastName',
  'fullName',
  'parentsName',
  'kidsName',
  'email',
  'phone',
  'description',
  'message',
  'subscribe',
  'nextSteps',
  'book',
  'contact',
  'prayer',
]

export async function sendToSheets(type, fields, successHandler, errorHandler, url = SHEETS_URL) {
  const dataFields = RESPONSE_KEYS.reduce((obj, key) => {
    if (typeof fields[key] === 'boolean') {
      obj[key] = fields[key] ? 'yes' : 'no'
    } else {
      obj[key] = fields[key] || ''
    }
    return obj
  }, {})
  const bodyData = {
    ...dataFields,
    formDataNameOrder: JSON.stringify(RESPONSE_KEYS),
    formGoogleSheetName: 'responses',
    type
  }
  const body = Object.entries(bodyData).map(([key, value]) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value)
  }).join('&');

  fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    mode: 'no-cors',
    body
  })
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