import { cloneDeep } from "lodash";
function setButtonState(btn, v) {
    if ( btn ) {
        switch (v) {
            case 'enable':
                btn.classList.contains('disabled') && btn.classList.remove('disabled');
                break;
            case 'disable':
                !btn.classList.contains('disabled') && btn.classList.add('disabled');
                break;
            default :
                break;
        }
    }
}
function setNavigAllButtonState(v) {
    setButtonState(document.querySelector('.tab-pane.active .mainHeader .toolbar .btnTrashAll'), v);
    setButtonState(document.querySelector('.tab-pane.active .mainHeader .toolbar .btnRemovePermantlyAll '), v);
    setButtonState(document.querySelector('.tab-pane.active .mainHeader .toolbar .btnRestoreAll '), v);
}
export function handleDisableTrashAllButton() {
    setButtonState(document.querySelector('.tab-pane.active .mainHeader .toolbar .btnTrashAll'), 'disable');
}
export function handleDisableTrashPermantlyAllButton() {
    setButtonState(document.querySelector('.tab-pane.active .mainHeader .toolbar .btnRemovePermantlyAll'), 'disable');
}
export function handleChangeSelectedRows(state) {
    const {selectedCount, selectedRows} = state;
    const rowsIdSelected = [];
    if ( selectedCount === 0 ) {
        this.rowsIdSelectedRef = [];
        setNavigAllButtonState('disable');
    }
    else {
        const postsListSelected = cloneDeep(selectedRows);
        postsListSelected.map(v => rowsIdSelected.push({guid : v.guid, id : v.id}) );
        this.rowsIdSelectedRef = [...rowsIdSelected];
        setNavigAllButtonState('enable');
    }
    //this.setState({ selectedRows });
}