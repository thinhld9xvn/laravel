function isCheckbox(target) {
    return target.nodeName.toLowerCase() === 'input' && 
                target.getAttribute('type') === 'checkbox';
}
function isLink(target) {
    return target.nodeName.toLowerCase() === 'a' || target.parentElement.nodeName.toLowerCase() === 'a';
}
export function handleSelectRow(target) {
    if ( isCheckbox(target) || isLink(target) ) {
        return;
    }
    const element = target.closest('.rdt_TableRow');
    if ( element ) {
        element.querySelector('input[type=checkbox][name*="select-row-"]').click();
    }
}
export function handleDeselectAllRows() {
    document.querySelectorAll('.tab-pane.active input[type=checkbox][name*="select-row-"]:checked')
            .forEach(checkbox => checkbox.click());
}
export function handleDeselectRows(guids, callback) {
    const selectedRows = this.rowsIdSelectedRef;
    document.querySelectorAll('.tab-pane.active input[type=checkbox][name*="select-row-"]:checked')
            .forEach(checkbox => {
        const name = checkbox.getAttribute('name');
        const id = parseInt(name.split('-').pop());
        const myIds = (selectedRows.filter(e => guids.indexOf(e.guid) !== -1)).map(e => e.id);
        if ( myIds.indexOf(id) !== -1 ) {
            checkbox.click();
        }
    });
    if ( callback ) {
        callback();
    }
}