// accept phone number is 10 digits or 11 digits
export function handleValidationPhoneNumber(v) {
    const reg = /((09|03|07|08|05)+([0-9]{8, 9})\b)/g;
    return v.match(reg);
}