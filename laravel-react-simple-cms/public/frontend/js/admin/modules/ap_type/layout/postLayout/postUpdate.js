import { POST_ACTIONS, POST_STATUS } from 'constants/globalConstants';
import { isEqual, cloneDeep } from 'lodash';
import CustomTreeListSelect from 'modules/custom-select/customTreeListSelect';
import React, {Component} from 'react';
import { getPostBoxStatusCaption, getPostStatusCaption, getPostSubmitCaption } from 'utils/postTypesUtils';
import PostFeaInitDate from './postFeaInitDate';
class PostUpdate extends Component {
    constructor(props) {
        super(props);
        const {post_status, post_date, post_modified_date, dateTimeInt, authorsList} = this.props;
        this.state = {
            post_status,
            dateTimeInt : cloneDeep(dateTimeInt),
            post_date : cloneDeep(post_date),
            post_modified_date : cloneDeep(post_modified_date),
            authorsList : cloneDeep(authorsList)
        };
    }
    componentDidUpdate() {
        const {post_status : postStatusState, post_date : post_dateState, post_modified_date : post_modified_dateState, dateTimeInt : dateTimeIntState, authorsList : authorsListState} = this.state;
        const {post_status, dateTimeInt, post_date, post_modified_date, authorsList} = this.props;
        if ( !isEqual(postStatusState, post_status)) {
            this.setState({ post_status });
        }
        if ( !isEqual(dateTimeIntState, dateTimeInt)) {
            this.setState({ dateTimeInt : cloneDeep(dateTimeInt) });
        }
        if ( !isEqual(post_dateState, post_date)) {
            this.setState({ post_date : cloneDeep(post_date) });
        }
        if ( !isEqual(post_modified_dateState, post_modified_date)) {
            this.setState({ post_modified_date : cloneDeep(post_modified_date) });
        }
        if ( !isEqual(authorsListState, authorsList)) {
            this.setState({ authorsList : cloneDeep(authorsList) });
        }
    }
    render() {
        const {post_status, post_date, post_modified_date, dateTimeInt, authorsList} = this.state;
        const {events, action, parent, handleChoosePostAuthor} = this.props;
        const {handlePublishPost} = events;
        const {date = '', day = '', month = '', year = '', time = ''} = dateTimeInt;
        const {date : postDate = '', day : postDay = '', month : postMonth = '', year : postYear = '', time : postTime = ''} = post_date;
        const {date : postModifiedDate = '', day : postModifiedDay = '', month : postModifiedMonth = '', year : postModifiedYear = '', time : postModifiedTime = ''} = post_modified_date;
        return (
            <div className="widget-box">
                <div className="widget-title">
                   {getPostBoxStatusCaption(action)}
                </div>
                <div className="widget-content">
                    <div className="widget-box-content">
                        <div className="rowFluid flex-align-center">
                            <span className="fa fa-spoon"></span>
                            <span className="padLeft5">
                                Trạng thái bài đăng: 
                                <strong className="padLeft5">{getPostStatusCaption(post_status)}</strong>
                            </span>
                        </div>
                        {action === POST_ACTIONS.new ? (
                            <PostFeaInitDate date = {{d : date, day, month, year}}
                                            time = {time}
                                            className = 'modified mtop10' />
                        ) : null}
                        {action === POST_ACTIONS.edit ? (
                            <>
                                <PostFeaInitDate date = {{d: postDate, day: postDay, month: postMonth, year: postYear}}
                                                time = {postTime}
                                                msg = "Ngày đăng:" />
                                <PostFeaInitDate date = {{d: postModifiedDate, day: postModifiedDay, month: postModifiedMonth, year: postModifiedYear}}
                                                time = {postModifiedTime}
                                                className = "modified mtop10"
                                                msg = "Ngày sửa gần nhất:" />
                            </>
                        ) : null}
                        <div className="rowFluid rowAuthor flex-align-center mtop10">
                            <span className="fluid-label flex-align-center">
                                <span className="fa fa-user"></span>
                                <span className="padLeft5">Tác giả:</span>
                            </span>
                            <span className="fluid-label">
                                <CustomTreeListSelect placeholder="--- Mời chọn ---"
                                                        parent={parent}
                                                        componentInst = "authorPostsInst"
                                                        variableReturn = "authorPostSelected"
                                                        data={authorsList} 
                                                        handleChooseItemCallback={handleChoosePostAuthor.bind(parent)}
                                                        showSearch = {false}
                                                        />
                            </span>
                        </div>
                        <div className="rowFluid mtop10">
                            <button className="btn btn-success btn-sm"
                                    onClick={handlePublishPost}>
                                <span className="fa fa-check"></span>
                                <span className="padLeft5">
                                    {getPostSubmitCaption(action)}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostUpdate;