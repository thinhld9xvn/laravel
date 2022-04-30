export function handleToggleStateForm() {
    let showLoginForm = ! this.state.showLoginForm;
    this.setState({
        showLoginForm : showLoginForm
    });
}