import { betweenRangeDate, compareDateMonth, compareTwoDateObj, convertToDateObj, getMonth, subtractDate } from "utils/dateTimeUtils";

export function handleFilterAction(item, params) {
    const { authorId, categoryId, postModifiedFilter } = params,
        {post_author, post_categories, post_date} = item,
        postModifiedDate = convertToDateObj(post_date),
        dateNow = new Date(Date.now());
    let boolCheck = authorId !== -1 ? parseInt(post_author) === authorId : true;
        boolCheck = boolCheck && (categoryId !== -1 ? post_categories.filter(cid => parseInt(cid) === categoryId).length > 0 : true);
    if (postModifiedFilter === 'filter_by_date_now') {
        boolCheck = boolCheck && compareTwoDateObj(postModifiedDate, dateNow);
    }
    else if (postModifiedFilter === 'filter_by_seven_days_ago') {
        const d1 = subtractDate(dateNow, 7),
            d2 = dateNow;
        // postModifiedDate >= d1 or postModifiedDate <= d2
        boolCheck = boolCheck && betweenRangeDate(postModifiedDate, d1, d2);
    }
    else if (postModifiedFilter === 'filter_by_this_month') {
        boolCheck = boolCheck && compareDateMonth(postModifiedDate, getMonth(dateNow));
    }
    return boolCheck;
}