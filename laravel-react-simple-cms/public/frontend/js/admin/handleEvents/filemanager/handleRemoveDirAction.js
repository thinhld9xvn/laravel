import { handleRemoveFolderAction } from 'utils/filemanager/folders/handleRemoveFolderAction';
export function handleRemoveDirAction() {
    if ( confirm("Bạn có chắc muốn thực hiện thao tác này ? Toàn bộ thư mục con và các tập tin sẽ bị xóa !!!") ) {
        handleRemoveFolderAction.call(this);
    }
}