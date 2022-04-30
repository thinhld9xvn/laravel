export function handleDragStart(e) {
    const id = e.currentTarget.id;
    document.getElementById(id)
            .closest('li')
            .classList.add('node-moving');
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("node-id", id);
}