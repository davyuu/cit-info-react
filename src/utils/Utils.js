export const isValidPhoneNumber = phoneNumber => {
  const phoneNumberRegex = /^[2-9]\d{9}$/;
  return !!phoneNumber && phoneNumberRegex.test(phoneNumber);
};

export const isValidEmail = email => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!email && emailRegex.test(email);
};

export const isFormValid = (fields, formType) => {
  const dontCheckContact = fields.dontCheckContact || false;
  const {
    firstName,
    lastName,
    email,
    phone,
    description,
    prayer
  } = fields;
  let isValid = true,
      errors = [],
      ret = {isValid, errors};
  if (formType === "prayerRequest") {
    if (!prayer) {
      errors.push("Please enter a prayer request");
      isValid = false;
    }
    return ret;
  }
  if (firstName === "") {
    errors.push("Please enter your first name");
    isValid = false;
  }
  if (lastName === "") {
    errors.push("Please enter your last name");
    isValid = false;
  }
  if (!dontCheckContact) {
    if (!email && !phone) {
      errors.push("Please enter your email or phone number");
      isValid = false;
    }
    if (email && !isValidEmail(email)) {
      errors.push("Please enter a valid email");
      isValid = false;
    }

    if (phone && !isValidPhoneNumber(phone)) {
      errors.push("Please enter a valid phone number");
      isValid = false;
    }
  }
  if (description === "") {
    errors.push("Please select a description");
    isValid = false;
  }
  return { isValid, errors };
};
