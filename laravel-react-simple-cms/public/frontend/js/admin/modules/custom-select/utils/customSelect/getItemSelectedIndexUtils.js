export function getItemSelectedIndex() {
    return this.state.data.findIndex(e => e['selected'] );
}