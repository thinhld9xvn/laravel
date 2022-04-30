export function handleDragEnd(e) {
    const id = e.target.id;
    let elemNode = document.getElementById(id),
        listNode = elemNode.closest('li');   
    listNode.classList.remove('node-moving');
}