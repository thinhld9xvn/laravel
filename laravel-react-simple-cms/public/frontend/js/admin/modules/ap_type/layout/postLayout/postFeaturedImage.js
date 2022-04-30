import { isEqual } from 'lodash';
import React, {Component} from 'react';
class PostFeaturedImage extends Component {
    constructor(props) {
        super(props);
        const {post_thumbnail, events} = this.props;
        this.state = {
            post_thumbnail,
            events
        }
    }
    componentDidUpdate() {
        const {post_thumbnail : postThumbnailState} = this.state;
        const {post_thumbnail} = this.props;
        if ( !isEqual(post_thumbnail, postThumbnailState) ) {
            this.setState({
                post_thumbnail : {...post_thumbnail}
            })
        }
    }
    render() {
        const {post_thumbnail, events} = this.state;
        const { onClick_showMediaDialog, onClick_removeFeaturedImage } = events;
        return (
            <div className="widget-box mtop20">
                <div className="widget-title">
                    Ảnh đại diện
                </div>
                <div className="widget-content">
                    <div className="featuredImage">
                        {post_thumbnail.src && (
                            <img src={post_thumbnail.src}                                              
                                alt={post_thumbnail.alt}
                                onClick={onClick_showMediaDialog} />
                        )}
                    </div>
                    <div className={"chooseFeaturedImage ".concat(post_thumbnail.src === '' ? '-notChosen' : '')}>
                        {post_thumbnail.src && (
                            <div>
                                <a href="#"
                                    onClick={onClick_removeFeaturedImage}>
                                    <span className="fa fa-trash"></span>
                                    <span className="caption padLeft5">
                                        Xóa ảnh đại diện
                                    </span>
                                </a>
                            </div>
                        )}
                        <div>
                            <a href="#"
                                onClick={onClick_showMediaDialog}>
                                <span className={post_thumbnail.src === '' ? 'fa fa-image' : 'fa fa-edit'}></span>
                                <span className="caption padLeft5">
                                    {post_thumbnail.src === '' ? 'Thêm ảnh đại diện' : 'Thay đổi ảnh đại diện'}
                                </span>
                            </a>
                        </div>
                    </div>                                
                </div>
            </div>
        )
    }
}
export default PostFeaturedImage;