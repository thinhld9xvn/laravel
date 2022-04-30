export function getItemSelectedIndex() {
    return this.state.filteredItems.findIndex(e => e['selected']);
}