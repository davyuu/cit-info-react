import base64 from 'base-64'

const dev_app_id = '8a253088577f90fe8abd972f3d0d8a7f215a09368606dd69ce2807e1286f11e5';
const dev_secret = '84c12963c49f42d6b2a226f73b36dead2e8157b0e61535e18dfa58df0d6256b3';
const prod_app_id = '309a52586fd38fc7ae18e4fcce41fdee6de813185b30c69cca599000fe5a81fb';
const prod_secret = '8c1c905e0e31cfe9cb17bae68f803e6cd971a9d2feff1980390549d7267b35e7';

const app_id = prod_app_id;
const secret = prod_secret;

const planningCenterHeaders = new Headers();
planningCenterHeaders.append("Authorization", "Basic " + base64.encode(`${app_id}:${secret}`));

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
