import { COMPONENT_INST, COMPONENT_MAP } from "constants/componentConstants";
import { ACTIVE_ROUTES } from "constants/UrlConstants";
import { mapObject } from "./libUtils";

var componentsLoadedList = null;
function getComponentsList() {
    return componentsLoadedList ? componentsLoadedList : [];
}
function getComponentId(name) {       
    return (getComponentsList()).findIndex(c => c.name.toLowerCase() === name.toLowerCase());
}
function saveComponentsList(list) {
    componentsLoadedList = list;
}
export function addComponentInst(c) {
    const componentsList = getComponentsList(),
         component = {
            name : c.name,
            instance : c.instance
         },
         id = getComponentId(c.name);    
    if ( id !== -1  ) {
        componentsList[id] = component;        
    } else {
        componentsList.push(component);        
    }
    saveComponentsList(componentsList);
}
export function getComponentInst(name) {    
    const c = getComponentsList().find(c => c.name.toLowerCase() === name.toLowerCase());
    return c ? c.instance : null;
}
export function saveActiveComponentName(name) {
    const inst = getComponentInst(COMPONENT_INST.MAIN_CONTAINER);
    inst.setState({ activeComponentInstName : name });
}
export function getActiveComponentName() {
    const inst = getComponentInst(COMPONENT_INST.MAIN_CONTAINER);
    return inst.state.activeComponentInstName;
}
export function getComponentNameFromActiveUrl() {
    const {pathname} = window.location;
    let n = '';
    COMPONENT_MAP.map(c => {
        if ( c['url'].startsWith(pathname) ) {
            n = c['name'];
        }
    });
    return n;
}