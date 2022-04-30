export function handleGetParentMenuItem(items, e) {
    return items.find(item => item['id'] == e['parent']);
}