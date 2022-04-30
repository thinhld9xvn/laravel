export function handleToggleNavBarDropDownMenu(e) {
    let navbarInfo = this.props.navbarInfo,
        element = e.currentTarget,
        keyitem = element.dataset ? element.dataset.keyItem : null,
        navbaritem = keyitem ? navbarInfo.navbar_items.filter(e => e['name'] === keyitem)[0] : null;
    if ( navbaritem ) {
        navbarInfo.navbar_item_active = navbaritem;
        navbarInfo.navbar_items.map(e => {
            if ( e['name'] === navbaritem['name'] ) {
                e.show = !e.show;
                return e;
            }
            if ( e.show ) {
                e.show = false;
            }
            return e;
        });
    } else {
        navbarInfo.navbar_items.map(e => {
            e.show = false;
            return e;
        });
    }
    this.props.updateNavStateItems( navbarInfo );
}