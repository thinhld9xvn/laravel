import React from 'react'
import { onClick_categoryFilter } from 'handleEvents/postTypesHandleEvents';
import { todoSearchCategoryNode } from 'utils/categoryPostTypesUtils';
export default function CategoriesList({ row, inst }) {
    const {categoriesList} = inst.state;
    const {post_categories} = row;
    const categories = post_categories ? post_categories.map((cid, index) => {
        const {name} = todoSearchCategoryNode(categoriesList, cid);
        return (
            <div key={index}>
                <a onClick={onClick_categoryFilter.bind(inst, name, cid)}
                    href="#">
                    {name}
                </a>
            </div>
        );
    }) : null;
    return (
        <div className="categoriesList">
            {categories}
        </div>
    )
}
