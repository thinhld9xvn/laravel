import { cloneDeep } from "lodash";
export function handleUpdateBrandNameByUrl() {
    let searched_item = null;
    const {pathname, search} = window.location;
    const {sidebarMenuItems, updateNavBrandName} = this.props;
    const searchMenuItem = (m_item) => {
        const href = pathname.concat(search).replace(/\#/ig, ''),
                url = m_item.url.replace(/\#/ig, '');
        if ( m_item.url == pathname || href === url ) {
            searched_item = cloneDeep( m_item );
            return;
        }
        if ( searched_item === null && m_item.childrens && m_item.childrens.length > 0 ) {
            m_item.childrens.map(searchMenuItem);
        }
    };
    if ( searched_item === null ) {
        searched_item = sidebarMenuItems[0];
    }
    //console.log(item);
    updateNavBrandName( searched_item.text );
}