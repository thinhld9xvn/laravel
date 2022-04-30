export const DEFAULT_AVATAR = 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
export const DEFAULT_AVATAR_NAME = '01.png';
export const REMOVE_ACTIONS = {
    soft : 1,
    hard : 2
}
export const MEDIA_MODAL_COMMAND = {
    insertAttachment : 'insertInToTinyMce',
    attachFeaturedImage : 'attachFeaturedImage',
    changeFeaturedImageCatObject : 'changeFeaturedImageCatObject'
};
export const POST_STATUS = {
    draft : 'draft',
    public : 'public',
    trash : 'trash'
}
export const POST_ACTIONS = {
    new : 'new',
    edit : 'edit',
    trash : 'trash',
    remove_permantly: 'remove_permantly'
}
export const IMAGE_DEF_SIZES = {
    thumbnail : 'thumbnail',
    medium : 'medium',
    large : 'large',
    full : 'full'
}
export const BRAND_NAMES = {
    EDIT_POST : 'Chỉnh sửa bài viết'
}
export const POST_TYPE_ENTRIES_MENU = {
    POSTS : {
        id : 'post',
        ALL_POSTS : {
            id : 'post__all_posts',
            text : 'Tất cả bài viết'
        },
        NEW_POST : {
            id : 'post__new_post',
            text : 'Đăng bài viết mới'
        },
        CATEGORIES : {
            id : 'post__categories_list',
            text : 'Danh mục con'
        },
        TAGS : {
            id : 'post__tags_list',
            text : 'Danh sách thẻ'
        }
    },
    PAGES : {
        id : 'page',
        ALL_PAGES : {
            id : 'page__all_pages',
            text : 'Tất cả trang'
        },
        NEW_PAGE : {
            id : 'page__new_page',
            text : 'Đăng trang mới'
        }
    }
}
export const ACTIONS_HOOKS = {
    PUBLISH_POST : 'publish_post',
    EDIT_POST : 'edit_post'
}