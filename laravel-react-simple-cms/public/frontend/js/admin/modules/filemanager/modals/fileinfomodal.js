import React from 'react';
import {convertFileSize, getURLUploadPath} from 'utils/filemanager/fileUtils';
import {closePopboxModal} from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
class FileInfoModal extends React.Component {
    constructor(props) {
        super(props);          
        this.state = {
            modal_id : MODAL_IDS.FILE_INFO
        };     
    }
    render() { 
        const {heading, closeText, file_item, onChange_InfoFileChanged} = this.props;
        const {modal_id} = this.state;
        if ( !file_item ) return null;
        const {sizes, thumbnail, info, datecreated, name, type} = file_item;
        const fileSize = file_item ? convertFileSize(file_item.length) : 0;
        return (            
            <div data-popbox-id={this.state.modal_id} className="popbox modal">
                <div className="popbox_container">
                    <div className="heading">{heading}</div>
                    <div className="text">
                        <div className="info-wrap overflow-hidden">
                            <div className="infoColLeft col-md-6 col-sm-6 col-xs-12">
                                <div className="file-thumbnail">
                                    <img src={thumbnail ? thumbnail : ''} 
                                        alt={info ? info.alt : ''} />
                                </div>
                                <div className="file-name mtop10">
                                    <strong>Tên tập tin: </strong> 
                                    {name}
                                </div>
                                <div className="file-type mtop10">
                                    <strong>Loại tập tin: </strong>
                                    {type.label}
                                </div>
                                {sizes ? (
                                    <div className="file-image-size mtop10">
                                        <strong>Kích thước: </strong> 
                                        {`${sizes.full[0]}x${sizes.full[1]}`}
                                    </div>
                                ) : null}
                                <div className="file-length mtop10">
                                    <strong>Dung lượng: </strong>                                  
                                    {`${fileSize.size} ${fileSize.unit}`}
                                </div>	
                                <div className="file-datecreated mtop10">					
                                    <strong>Ngày tạo: </strong> 
                                    {datecreated}
                                </div>                                 
                            </div>
                            <div className="infoColRight col-md-6 col-sm-6 col-xs-12 mtop20-xs">                            
                                <div className="info-input">
                                    <label>
                                        Tiêu đề
                                    </label>  
                                    <input id="ifile-title" 
                                        type="text" 
                                        className="form-control"
                                        data-property="title"
                                        value={info ? info.title : ''}
                                        onChange={onChange_InfoFileChanged} />
                                </div>
                                <div className="info-input mtop10">
                                    <label>
                                        Chú thích
                                    </label>
                                    <textarea id="ifile-alt" 
                                                className="form-control" 
                                                rows={3}
                                                data-property="alt"
                                                value={info ? info.alt : ''}
                                                onChange={onChange_InfoFileChanged} />
                                </div>
                                <div className="info-input mtop10">
                                    <label>
                                        Mô tả
                                    </label>
                                    <textarea id="ifile-description" 
                                                className="form-control" 
                                                rows={3}
                                                data-property="description"
                                                value={info ? info.description : ''}
                                                onChange={onChange_InfoFileChanged} />
                                </div>                           
                            </div>                          
                        </div>
                    </div>
                    <div className="footer">
                        <button className="btn btn-default btn-sm"
                                onClick={() => closePopboxModal(modal_id)}>{closeText}</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default FileInfoModal;