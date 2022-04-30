import React, {Component} from 'react';
import CustomTreeList from 'modules/custom-select/customTreeList';
import { cloneDeep, isEqual } from 'lodash';
import { isPagePostType } from 'utils/postTypesUtils';
class PostCategory extends Component {
    constructor(props) {
        super(props);
        const {events, inst, data} = this.props;
        const {post_type, categoriesList, showFormCategory} = data;
        this.state = {
            events,
            inst,
            post_type,
            categoriesList : cloneDeep(categoriesList),
            showFormCategory
        };
    }
    componentDidUpdate(nextProps, nextState) {
        const {categoriesList : categoriesListState, showFormCategory : showFormCategoryState, post_type : post_typeState } = this.state;
        const {data} = this.props;
        const {categoriesList, showFormCategory, post_type} = data;
        if ( !isEqual(categoriesListState, categoriesList) ) {
            this.setState({
                categoriesList : cloneDeep(categoriesList)
            });
        }
        if ( !isEqual(showFormCategoryState, showFormCategory) ) {
            this.setState({
                showFormCategory
            });
        }
        if ( !isEqual(post_typeState, post_type) ) {
            this.setState({
                post_type
            });
        }
    }
    render() {
        const {events, categoriesList, post_type, inst} = this.state;
        const {onClick_showPostCategoryModal, handleChooseItemCallback} = events;
        return (
            <div className="widget-box mtop20">
                <div className="widget-title">
                    <span>Danh mục</span>
                    {post_type === 'post' ? (
                        <span className="required">(*)</span>
                    ) : null}
                </div>
                <div className="widget-content">
                    {categoriesList &&
                        <CustomTreeList parent={inst}
                                        data={categoriesList}
                                        handleChooseItemCallback={handleChooseItemCallback}
                                        variableReturn="chooseCategoriesList" />
                    }
                    <div className="addCategorySection mtop20">
                        <a href="#"
                            onClick={onClick_showPostCategoryModal}>
                            <span className="fa fa-plus"></span>
                            <span className="padLeft5">Chỉnh sửa danh mục</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostCategory;