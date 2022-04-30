export function handleValidationOnlyNumber(v) {
    const reg = /^[0-9]+$/ig;
    return v.match(reg);
}