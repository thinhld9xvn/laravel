export function handleOutsideClick(e) {
    const target = e.target;
    const selectList = document.querySelector('.option-custom.option-select-custom.show');
    if ( selectList && !selectList.contains(target) ) {
        this.setState({
            isOpen: false
        });
    }
}