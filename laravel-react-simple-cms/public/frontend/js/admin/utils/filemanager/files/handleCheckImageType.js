export function handleCheckImageType(image) {
    const {type} = image;
    const {code} = type;
    return code === 'image';
}