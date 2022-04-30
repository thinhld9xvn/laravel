export function handleCaptureKeypressRenameDir(e) {
    const ENTER_KEY = 13,  
          DASHED_KEY = 45,
          UNDERSCORE_KEY = 95,
          SPECIAL_KEYS_ALLOWED = [DASHED_KEY, UNDERSCORE_KEY];          

    let charCode = e.which,
        boolCheck = false;

    if ( charCode === ENTER_KEY ) {
        document.querySelector('.tree-node-editing').blur();
        return;
    }

    if ( SPECIAL_KEYS_ALLOWED.includes( charCode ) ) {
        return;
    }

    boolCheck = (charCode > 32) && (charCode < 48); // special keys
    boolCheck = boolCheck || (charCode > 57) && (charCode < 65); // special keys
    boolCheck = boolCheck || (charCode > 90) && (charCode < 97); // special keys
    boolCheck = boolCheck || (charCode > 122) && (charCode < 127); // special keys

    if ( boolCheck ) {
        e.preventDefault();
    }    
}