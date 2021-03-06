import React from 'react';
import './css/style.css';
import './css/layout.min.css';
import {onDragOver_DropFile, onDrop_DropFile, 
        onScroll_LoadingFilesList, onClick_ShowModalChooseFile,
        onChange_InfoFileChanged, onMouseUp_DisableContextMenu, onClick_PerformContextMenuAction, onDragStart_DropFile} from 'handleEvents/fileManagerHandleEvents';
//import Modal from 'react-modal';
import FileInfoModal from './modals/fileinfomodal';
import FileUploadModal from './modals/fileuploadmodal';
import AjaxLoading from './components/AjaxLoading';
import FileManagerToolbar from './components/FileManagerToolbar';
import FolderTree from './components/FolderTree';
import FileTree from './components/FileTree';
import FileContextMenu from './components/FileContextMenu';
import FolderContextMenu from './components/FolderContextMenu';
import { addComponentInst, saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { handleInitLoadTrees } from 'utils/filemanager/folders/handleInitLoadTrees';
import { handleResetLoadTreesEvents } from 'utils/filemanager/folders/handleResetLoadTreesEvents';
import FileIToolbar from './components/FileIToolbar';
import { isUndefined } from 'utils/libUtils';
import { getSelectedFiles } from 'utils/filemanager/fileUtils';
import { IMAGE_DEF_SIZES } from 'constants/globalConstants';
class FileManager extends React.Component {
    constructor(props) {
        super(props);        
        const filemanager_toolbar = {
            folder : [
                {
                    navigation : 'new directory',
                    className : 'btn btn-danger root new_dir',
                    command : 'new_dir',
                    text : 'Tạo thư mục',
                    disabled : false
                },
                {
                    navigation : 'rename directory',
                    className : 'btn btn-danger root ren_dir',
                    command : 'ren_dir',
                    text : 'Đổi tên thư mục	',
                    disabled : true
                },
                {
                    navigation : 'trash directory',
                    className : 'btn btn-danger root trash_dir',
                    command : 'trash_dir',
                    text : 'Xoá thư mục',
                    disabled : true
                }
            ],
            upload : [
                {
                    navigation : 'upload',
                    className : 'btn btn-primary file upload_file',
                    command : 'upload_file',
                    text : 'Upload tập tin',
                    disabled : false
                }
            ],
            file : [
                {
                    navigation : 'info file',
                    className : 'btn btn-primary file info_file',
                    command : 'info_file',
                    text : 'Thông tin tập tin',
                    disabled : true
                },
                {
                    navigation : 'trash file',
                    className : 'btn btn-primary file trash_file',
                    command : 'trash_file',
                    text : 'Xoá tập tin',
                    disabled : true
                }
            ]
        };
        const FIMAGEURL = window.location.origin + '/frontend/js/admin/modules/filemanager/images/';
        const default_folder_name = 'New Folder';
        const {embbed} = props;
        this.state = {
            FIMAGEURL,
            FICON_STAT : {
                uploading : FIMAGEURL + 'uploading.png',
                error : FIMAGEURL + 'error.png',
                loading : FIMAGEURL + 'loading-image.webp',
                exe : FIMAGEURL + 'exe.png',
                pdf : FIMAGEURL + 'pdf.png',
                php : FIMAGEURL + 'php.png',
                word : FIMAGEURL + 'word.png',
                excel : FIMAGEURL + 'excel.png',
                other : FIMAGEURL + 'other.png'
            },
            UPLOAD_ERROR_MESSAGE : {
                name_not_validate : "Tên file không hợp lệ, xin hãy đổi tên và upload lại.",
                not_support_file_type : "Loại file này không được phép upload lên server.",
                exceed_limit_upload_size : "Kích thước file vượt quá giới hạn cho phép."                
            },
            FACTION_STAT : {
                CREATE_DIR : 0,
                RENAME_DIR : 1,
            },
            FOLDER_ERROR_MESSAGE : {
                set_name_default_error : 'Thư mục không được bỏ trống hoặc đặt tên là ' + default_folder_name,
                set_name_exists_error : 'Thư mục này đã tồn tại, xin mời đặt tên khác !!!'
            },
            FCONTEXT_MENU_STAT : {
                file : {
                    show : false,
                    X : 0, 
                    Y : 0
                },
                folder : {
                    show : false,
                    X : 0, 
                    Y : 0
                }
            },
            toolbar : filemanager_toolbar,
            folder_nodes : [],
            files_list : [],
            temp_files_list : [],
            files_per_page : 30,
            files_scroll_paged : 1,
            is_ajax_loading : false,
            keyPreview : true,
            upload_stat : true,
            root_dir_path : '/',       
            default_folder_name,
            action : '',
            fileInfoInModal : null,
            embbed : !isUndefined(embbed) ? embbed : false,
            embbedChooseSize : IMAGE_DEF_SIZES.thumbnail,
            showIToolbar : true,
        };           
        this.dragRef = false;
    }
    componentDidMount() {
        handleInitLoadTrees.call(this);        
        document.addEventListener('mouseup', onMouseUp_DisableContextMenu.bind(this));   
        saveActiveComponentName(COMPONENT_INST.FILE_MANAGER);
    }
    componentDidUpdate() {
        const {embbed} = this.props;
        const {embbed : embbedState} = this.state;
        if ( embbedState !== embbed ) {
            this.setState({ embbed });
        }
        addComponentInst({
            name : COMPONENT_INST.FILE_MANAGER,
            instance : this
        });
    }    
    componentWillUnmount() {
        document.removeEventListener('mouseup', onMouseUp_DisableContextMenu);  
        handleResetLoadTreesEvents();
    }
    handleMouseDown(e) {   
        if ( e.target.tagName.toLowerCase() !== 'select' ) {
            e.preventDefault();
            this.dragRef = true;
        }
    }
    handleMouseUp(e) {
        e.preventDefault();
        this.dragRef = false;
    }
    handleMouseMove(e) {
        e.preventDefault();
        if ( this.dragRef ) {
            const target = document.getElementById('popup-infile');
            const parent = document.querySelector('#file-manager');
            const topOffset = parent.getClientRects()[0].top;
            const heightOffset = parent.clientHeight;
            const targetHeightOffset = target.clientHeight;
            const beginOffset = 70;
            const Y = e.pageY - topOffset;
            if ( target && Y >= beginOffset && Y < heightOffset - targetHeightOffset  ) {
                target.style.top = Y + 'px';
            }
        }
    }
    handleCloseIToolbar(e) {
        e.preventDefault();
        this.setState({
            showIToolbar : false
        });
    }
    render() {
        const {embbed, showIToolbar} = this.state;
        const selected_files = getSelectedFiles.call(this);
        return (
            <div className="w100p">
                <div className="filemanager-content w100p fm-row-height">
                    <div id="file-manager" 
                         className="file-manager overflow-hidden w100p h100p-ms"
                         onMouseMove={this.handleMouseMove.bind(this)}
                         onMouseUp={this.handleMouseUp.bind(this)}>                        
                        <FileManagerToolbar data={this.state.toolbar}
                                            parent={this} />
                        <div className={"fm-left col-sm-2 col-xs-12 ".concat(this.state.is_ajax_loading ? 'disabled' : '')}>
                            <FolderTree data={this.state.folder_nodes}
                                        parent={this} />
                        </div>
                        <div className="fm-right col-sm-10 col-xs-12" 
                            onDragStart={onDragStart_DropFile.bind(this)}
                            onDragOver={onDragOver_DropFile.bind(this)}
                            onDrop={onDrop_DropFile.bind(this)}
                            onScroll={onScroll_LoadingFilesList.bind(this)}>
                            <div id="jfmListFile" className="jpanel_content h100p-ms">
                                <div id="listFile-columns-layout" 
                                    className="listFile-columns-layout">
                                    {
                                        this.state.is_ajax_loading ? <AjaxLoading /> : 
                                                                     <FileTree  data={this.state.temp_files_list}
                                                                                FICON_STAT={this.state.FICON_STAT}                                                                                
                                                                                parent={this} />
                                    }
                                </div>
                            </div>
                        </div>
                        {embbed ? <FileIToolbar data = {selected_files && selected_files.length
                                                            ? selected_files[0] : null}
                                                show = {showIToolbar}
                                                parent = {this}
                                                handleMouseDown = {this.handleMouseDown.bind(this)}
                                                handleClose = {this.handleCloseIToolbar.bind(this)} /> : null}
                    </div>
                </div>
                <FileInfoModal heading="Thông tin tập tin"
                               file_item={this.state.fileInfoInModal}
                               onChange_InfoFileChanged={onChange_InfoFileChanged.bind(this)}                             
                               closeText="Đóng lại"  />
                <FileUploadModal heading="Upload tập tin"
                                 onClick_ShowModalChooseFile={onClick_ShowModalChooseFile.bind(this)}
                                closeText="Đóng lại" />
                <FileContextMenu data={this.state.toolbar.file} 
                                 context_menu={this.state.FCONTEXT_MENU_STAT.file} 
                                 onClick_PerformContextMenuAction={onClick_PerformContextMenuAction.bind(this)} />
                <FolderContextMenu data={this.state.toolbar.folder}
                                   context_menu={this.state.FCONTEXT_MENU_STAT.folder} 
                                    onClick_PerformContextMenuAction={onClick_PerformContextMenuAction.bind(this)} />
            </div>
        )
    }
}
export default FileManager;
