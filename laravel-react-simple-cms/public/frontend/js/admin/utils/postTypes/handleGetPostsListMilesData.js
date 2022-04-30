export function handleGetPostsListMilesData(data) {
    const postsListMiles = [];
    data.map((post, i) => {
        const post_modified_date = new Date(post.post_modified_date),
              date = post_modified_date.getDate(),
              month = post_modified_date.getMonth() + 1,
              year = post_modified_date.getFullYear(),
              post_categories = post.post_categories,
              arrPostCategories = [];
        const post_categories_data = post_categories.split(';');
        post_categories_data.map(cat => {
            const cat_data = cat.split('***');
            arrPostCategories.push({
                id: cat_data[0],
                name: cat_data[1]
            })
        });
        const postData = {
            id: i,
            post_title : post.post_title,
            username: {
                id: post.post_author,
                name: post.username,
                display_name: post.display_name
            },
            post_modified_date: `${date}/${month}/${year}`,
            post_categories: arrPostCategories,
            post_featured_image: post.post_feature_image
        }
        postsListMiles.push(postData);
    });
    return postsListMiles;
}