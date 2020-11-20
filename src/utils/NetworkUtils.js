
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
const SHEETS_HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' }
const SHEETS_DATA = {
  formDataNameOrder: JSON.stringify(RESPONSE_KEYS),
  formGoogleSheetName: 'responses'
}

export const sendToSheets = (type, fields, successHandler, errorHandler, url = SHEETS_URL) => {
  const dataFields = RESPONSE_KEYS.reduce((obj, key) => {
    if (typeof fields[key] === 'boolean') {
      obj[key] = fields[key] ? 'yes' : 'no'
    } else {
      obj[key] = fields[key] || ''
    }
    return obj
  }, {})
  const data = {
    ...dataFields,
    ...SHEETS_DATA,
    type
  }
  const body = Object.entries(data).map(([key, value]) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value)
  }).join('&');

  postRequest(url, successHandler, errorHandler, body, SHEETS_HEADERS)
}