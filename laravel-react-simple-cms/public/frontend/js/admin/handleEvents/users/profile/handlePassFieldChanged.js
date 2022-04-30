export function handlePassFieldChanged(e) {
    let userPassword = this.state,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;
    userPassword[field] = v; 
    this.setState( userPassword ); 
}