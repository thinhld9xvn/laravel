export function handleSavePos(e) {
    e.preventDefault();
    let offsetTop = e.currentTarget.offsetTop > 0 ? e.currentTarget.offsetTop : this.state.scrollTop;
    this.setState({
        scrollTop : offsetTop
    });    
}