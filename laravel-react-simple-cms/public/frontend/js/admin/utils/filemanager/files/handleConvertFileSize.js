export function handleConvertFileSize(size) {
    var KB = 1024,
        MB = KB * 1024,
        GB = MB * 1024;
    size = parseFloat(size);
    if (size >= KB && size < MB) {
        return { 'size': Math.round(size / KB), 'unit': 'KB' };
    }
    if (size >= MB && size < GB) {
        return { 'size': Math.round(size / MB), 'unit': 'MB' };
    }
    return { 'size': size, 'unit': 'B' };
}