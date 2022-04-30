import { COMPONENT_INST } from "constants/componentConstants";
import { getActiveComponentName, getComponentInst, getComponentNameFromActiveUrl } from "utils/componentUtils";
import { getActiveUrlParams, getFullUrlFromPathName, isDiffSearch, removeAllParametersFromUrl } from "utils/urlUtils";
import {cloneDeep} from "lodash"
import { getBrandNameByText } from "utils/navbarUtils";
import { closeAllPopboxModal } from "utils/modalUtils";
import { scrollPageToTop } from "utils/libUtils";
import { changeRouterHook } from "../../hooks/routerHook/changeRouterHook";
function isToggleSub(target) {
    return target.classList.contains('has-sub');
}
function performUpdate(target) {
    let element = target.querySelector('a'),
        _keyitem = element.dataset.keyItem.toString();
    setActiveSidebarItem(_keyitem);    
}
export function setActiveSidebarItem(eid) {
    const sinst = getComponentInst(COMPONENT_INST.SIDEBAR_LEFT);
    const {sidebarMenuItems : menuitems, updateNavBrandName, updateSidebarMenu} = sinst.props;
    let m_item = {};
    const filterMenuItem = e => {
        if (e['id'] === eid) m_item = e;
        if (e['hasChildrens']) e['childrens'].map(filterMenuItem);
        return e;
    };
    menuitems.map(filterMenuItem);
    // menu là menu con
    if (m_item['hasChildrens']) {
        m_item['is_expand'] = !m_item['is_expand'];
    }
    else {
        updateNavBrandName(getBrandNameByText(m_item['text']));
        menuitems.map(e => {
            if (e['is_active']) {
                e['is_active'] = false;
            }
            if (e['hasChildrens']) {
                e['childrens'].map(sitem => {
                    if (sitem['is_active']) {
                        sitem['is_active'] = false;
                    }
                    return sitem;
                });
            }
            return e;
        });
        m_item['is_active'] = true;
    }
    updateSidebarMenu(cloneDeep(menuitems));
}
export function handleMenuItemToggle(e) {
    const {history: newHistory} = this.props;
    const {pathname, search, href, origin} = window.location;
    const target = e.currentTarget;    
    const currentComponentName = getComponentNameFromActiveUrl();
    const newUrlParams = pathname + search;
    const activeUrlParams = getActiveUrlParams();
    const activePathName = removeAllParametersFromUrl(origin + activeUrlParams);        
    if ( isToggleSub(target) ) {
        history.pushState('', '', activeUrlParams);
    }
    if ( !isToggleSub(target) ) {
        closeAllPopboxModal();        
        if ( activePathName === pathname && 
                isDiffSearch(getFullUrlFromPathName(activeUrlParams), 
                                getFullUrlFromPathName(href)) ) {
            changeRouterHook(currentComponentName);
        }
        if ( currentComponentName === COMPONENT_INST.NEW_POST_LAYOUT ) {
            /*handlePrompSaveNewPostBeforeQuit({
                activeUrlParams,
                yes_callback : () => {
                    performUpdate.call(this, target);
                    newHistory.push(newUrlParams);
                },
                no_callback : () => {
                    performUpdate.call(this, target);
                    newHistory.push(newUrlParams);
                }
            });
            return;*/
        }
        scrollPageToTop();
        performUpdate.call(this, target);
        return;
    }    
    performUpdate.call(this, target);
}