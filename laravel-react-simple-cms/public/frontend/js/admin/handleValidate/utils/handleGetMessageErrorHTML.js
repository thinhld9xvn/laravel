export function handleGetMessageErrorHTML(msg) {
    return `<span>
                <span class="fa fa-exclamation-circle"></span>
                <span class="padLeft5">${msg}</span>
            </span><br/>`;
}