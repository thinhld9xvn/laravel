import React, {Component} from 'react';
import { onClick_showPostTagModal } from 'handleEvents/postTypesHandleEvents';
import { isEqual, cloneDeep } from 'lodash';
import TemplateTagItem from '../postTags/templateTagItem';
import Dragula from 'react-dragula';
import 'react-dragula/dist/dragula.min.css';
import { addComponentInst } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { onClick_removePostTag } from 'handleEvents/tagsHandleEvents';
import { handlePostTagsDragEnd } from 'handleEvents/tags/handlePostTagsDragEnd';
class PostTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagsList : [],
            tagsListData : []
        }
        this.dragulaDecorator = this.dragulaDecorator.bind(this);
    }
    componentDidUpdate() {
        const {tagsList : tagsListState} = this.state;
        const {tagsList} = this.props;
        if ( !isEqual(tagsListState, tagsList) ) {
            this.setState({
                tagsList : cloneDeep(tagsList),
                tagsListData : tagsList.map((tag, i) => <TemplateTagItem key = {tag.value} 
                                                                          tag = {tag}
                                                                          handleRemoveTag = {onClick_removePostTag.bind(this, tag.value)} />)
            });
        }
        addComponentInst({
            name: COMPONENT_INST.POST_TAGS_LAYOUT,
            instance: this
        }); 
    }
    dragulaDecorator(componentBackingInstance) {        
        if (componentBackingInstance) {
            let options = { };
            Dragula([componentBackingInstance], options).on('dragend', handlePostTagsDragEnd);
        }
    };
    render() {
        const {tagsListData} = this.state;
        const hasTags = tagsListData && tagsListData.length;
        return (
            <div className="widget-box mtop20">
                <div className="widget-title">
                    Thẻ bài viết
                </div>
                <div className="widget-content">
                    {hasTags ? (
                        <div className="tagsList">
                            <div className="ReactTags__selected" ref={this.dragulaDecorator}>
                                {tagsListData}
                            </div>
                        </div>
                    ) : null}
                    <div className={"addCategorySection ".concat(hasTags ? 'mtop10' : '')}>
                        <a href="#"
                            onClick={onClick_showPostTagModal.bind(this)}>
                            <span className="fa fa-tags"></span>
                            <span className="padLeft5">Chọn thẻ bài viết</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostTags;