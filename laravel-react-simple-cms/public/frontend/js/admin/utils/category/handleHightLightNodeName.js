export function handleHightLightNodeName(name, key) {
    let pos = name.toLowerCase().indexOf(key.toLowerCase());
    //debugger;
    while ( pos !== -1 ) {
        const s = name.substr(pos, key.length);
        name = name.substr(0, pos) + "<s>" + s + "</s>" + name.substr(pos + key.length);
        pos = name.indexOf(key, pos + 1 + 7);
    }
    return name.replace(/\<s\>/ig, '<strong>')
                .replace(/\<\/s\>/ig, '</strong>');
}