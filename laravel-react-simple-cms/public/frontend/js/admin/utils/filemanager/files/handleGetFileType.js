export function handleGetFileType(ext) {
    if (ext === 'png' || ext === 'bmp' || ext === 'gif' || ext === 'jpg' || ext === 'jpeg' || ext === 'svg') return 'image';
    if (ext === 'exe') return 'executable';
    if (ext === 'doc' || ext === 'docx') return 'word';
    if (ext === 'xls' || ext === 'xlsx') return 'excel';
    if (ext === 'php') return 'php source';
    if (ext === 'pdf') return 'portable document';
    return 'other';
}