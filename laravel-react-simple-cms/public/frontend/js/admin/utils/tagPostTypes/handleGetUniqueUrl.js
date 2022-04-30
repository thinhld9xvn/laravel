export function handleGetUniqueUrl(nodes, url) {
    let id = 0;
    nodes.map(e => {
        const myUrl = e.url;
        const myId = myUrl.split('-').pop();
        if ( !isNaN(myId) && id < parseInt(myId) ) {
            id = parseInt(myId);
        }
    });
    return url + '-' + (id + 1);   
}