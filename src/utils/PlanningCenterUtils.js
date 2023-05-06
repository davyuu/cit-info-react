export const createPerson = (person) => {
  const url = 'https://api.planningcenteronline.com/people/v2/people';

  const body = JSON.stringify({
    data: {
      type: 'Person',
      attributes: {
        first_name: person.firstName,
        last_name: person.lastName
      }
    }
  });

  const successHandler = (res) => {
    const personId = res.data.id

    Promise.all([
      createEmailForPerson = (personId),
      createPhoneNumberForPerson = (personId),
      postSubscribedForPerson = (personId),
      postTypeForPerson = (personId),
    ]).then(([emailRes, numberRes, subRes, typeRes]) => {
      if(!(emailRes && numberRes && subRes && typeRes)){
        this.showSuccess();
      } else {
        this.showError('An error occurred')
      }
    })
  };

  NetworkUtils.postRequest(url, successHandler, this.errorHandler, body)
}

export const createEmailForPerson = (personId) => {
  if(this.state.email) {
    const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/emails`;

    const body = JSON.stringify({
      data: {
        type: 'Email',
        attributes: {
          address: this.state.email,
          location: "Home"
        },
      }
    });

    NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
  }
}

export const createPhoneNumberForPerson = (personId) => {
  if(this.state.phone) {
    const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/phone_numbers`;

    const body = JSON.stringify({
      data: {
        type: 'PhoneNumber',
        attributes: {
          number: this.state.phone,
          location: "Mobile",
        },
      }
    });

    NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
  }
}

export const postSubscribedForPerson = (personId) => {
  const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/field_data`;

  const body = JSON.stringify({
    data: {
      type: 'FieldDatum',
      attributes: {
        field_definition_id: process.env.SUBSCRIBE_FIELD_ID,
        value: this.state.subscribe,
      },
    }
  });

  NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
}

export const postTypeForPerson = (personId) => {
  const url = `https://api.planningcenteronline.com/people/v2/people/${personId}/field_data`;

  const body = JSON.stringify({
    data: {
      type: 'FieldDatum',
      attributes: {
        field_definition_id: process.env.CONNECT_FIELD_ID,
        value: true,
      },
    }
  });

  NetworkUtils.postRequest(url, this.successHandler, this.errorHandler, body)
}

export const successHandler = () => {
  return true
};

export const errorHandler = () => {
  return false
};