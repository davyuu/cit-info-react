export const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[2-9]\d{9}$/;
    return !!phoneNumber && phoneNumberRegex.test(phoneNumber);
};

export const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email && emailRegex.test(email);
};
