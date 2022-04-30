// xóa dấu tiếng việt của chuỗi
export function handleRemoveAccents(str) {
    return str.normalize('NFD')
        	  .replace(/[\u0300-\u036f]/g, '')
        	  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}