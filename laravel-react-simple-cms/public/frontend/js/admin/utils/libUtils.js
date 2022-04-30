import {getListIdsPopboxModal} from 'utils/modalUtils';
import {getComponentInst} from 'utils/componentUtils';
import { COMPONENT_INST } from '../constants/componentConstants';
import { cloneDeep } from 'lodash';
export function isUndefined(o) {
    return typeof( o ) === 'undefined';
}
export function isEmptyObj(o) {
    if (typeof(o) !== 'object' ) {
        return null
    }
    return Object.keys(o).length === 0;
}
export function getCopiedJsonObject(o) {
    return cloneDeep( o );
}
export function mapObject(o, callback) {
    let keys = Object.keys(o),
        length = keys.length;
    for ( let i = 0; i < length; i++ ) {
        callback( o[keys[i]], i );
    }
}
export function setUnFocusForm(form) {
    try {
        let X = window.scrollX,
            Y = window.scrollY,
            ids = getListIdsPopboxModal(),
            hasPopboxModalShow = ids.length > 0,
            popboxBodyModal = null,
            mainContent = null;
        if ( hasPopboxModalShow ) {
            let popboxModals = document.querySelectorAll('.popbox.opened.visible'),
                popboxModal = popboxModals[popboxModals.length - 1];
            popboxBodyModal = popboxModal.querySelector('.popbox_container > .text');
            X = popboxBodyModal.scrollLeft;
            Y = popboxBodyModal.scrollTop;
        }
        else {
            mainContent = form.querySelector('.mainContent');
            if ( mainContent !== null ) {
                /*X = mainContent.scrollLeft;
                Y = mainContent.scrollTop;*/
                X = 0;
                Y = 0;
            }
        }
        form.querySelectorAll('input, textarea')
                    .forEach(e => {          
            e.focus();
            setTimeout(() => {
                e.blur();
            }, 100);
        });
        if ( hasPopboxModalShow ) {
            popboxBodyModal.scrollTo(X, Y);
        }
        else {
            if ( mainContent !== null ) {
                mainContent.scrollTo(X, Y);
            }
            else {
                window.scroll(X, Y);
            }
        }
    } catch {}
}
export function scrollPageToTop(op) {
    const panel = document.querySelector('.tab-pane.active .mainContent');
    window.scrollTo(0, 0);
    panel && panel.scroll(0, 0);
}
export function scrollActiveModalToTop() {
    document.querySelector('.modal.opened.visible .popbox_container > .text').scroll(0, 0);
}
export function showLoadingOverlay() {
    const loaderInst = getComponentInst(COMPONENT_INST.LOADER);    
    loaderInst.setState({ loaderState : true });
}
export function closeLoadingOverlay(callback) {
    const loaderInst = getComponentInst(COMPONENT_INST.LOADER);
    loaderInst.setState({ loaderState : false }, () => { 
        callback && callback();
    });
}