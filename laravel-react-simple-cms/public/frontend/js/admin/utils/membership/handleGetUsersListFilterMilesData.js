export function handleGetUsersListFilterMilesData(data) {
    const usersListMiles = [];
    usersListMiles.push({
        name: 'Tất cả tác giả',
        value: '-1',
        selected: true
    });
    data.map(user => {
        const userData = {
            name: user.display_name,
            value: user.guid,
            display_name: user.display_name,
            selected: false
        };
        usersListMiles.push(userData);
    });
    return usersListMiles;
}