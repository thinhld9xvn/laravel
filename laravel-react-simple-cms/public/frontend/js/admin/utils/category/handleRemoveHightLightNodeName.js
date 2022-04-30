export function handleRemoveHightLightNodeName(name) {
    return name.replace(new RegExp('<strong>', 'ig'), '')
               .replace(new RegExp('</strong>', 'ig'), '');
}