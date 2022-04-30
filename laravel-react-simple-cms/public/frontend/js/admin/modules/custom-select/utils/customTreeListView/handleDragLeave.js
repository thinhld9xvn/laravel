export function handleDragLeave(e) {
    e.preventDefault();
    const target = e.target;
    console.log('abc');
    target.classList.remove('selected');
}