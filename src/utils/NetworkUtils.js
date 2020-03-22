
import base64 from 'base-64'

const APP_ID = process.env.APP_ID,
      APP_SECRET = process.env.APP_SECRET,
      SHEETS_URL = process.env.SHEETS_URL,
      PRAYER_REQUEST_SHEETS_URL = process.env.PRAYER_REQUEST_SHEETS_URL,
      SHEETS_HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' },
      // SHEETS_DATA = {
      //   formDataNameOrder: JSON.stringify(RESPONSE_KEYS),
      //   formGoogleSheetName: 'responses'
      // },
      RESPONSE_KEYS = [
        'type',
        'firstName',
        'lastName',
        'email',
        'phone',
        'description',
        'message',
        'subscribe',
        'nextSteps'
      ],
      PRAYER_REQUEST_RESPONSE_KEYS = [
        'type',
        "fullName",
        "phone",
        "contact",
        "prayer"
      ],
      PLANNING_CENTER_HEADERS = new Headers();
      PLANNING_CENTER_HEADERS.append("Authorization", "Basic " + base64.encode(`${APP_ID}:${APP_SECRET}`));
const getSheetData = responseKeys=> {
  return {
    formDataNameOrder: JSON.stringify(responseKeys),
    formGoogleSheetName: 'responses'
  }
}
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

export const sendToSheets = (type, fields, successHandler, errorHandler) => {
  const PRAYER_REQUEST = type === "prayer",
        KEYS = (PRAYER_REQUEST) ? PRAYER_REQUEST_RESPONSE_KEYS : RESPONSE_KEYS,
        URL = (PRAYER_REQUEST) ? PRAYER_REQUEST_SHEETS_URL : SHEETS_URL;
  let dataFields = KEYS.reduce((obj, key) => {
    if (typeof fields[key] === 'boolean') {
      obj[key] = fields[key] ? 'yes' : 'no'
    } else {
      obj[key] = fields[key] || ''
    }
    return obj
  }, {})
  const data = {
    ...dataFields,
    ...getSheetData(KEYS),
    type
  }
  const body = Object.entries(data).map(([key, value]) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value)
  }).join('&');

  postRequest(URL, successHandler, errorHandler, body, SHEETS_HEADERS)
}