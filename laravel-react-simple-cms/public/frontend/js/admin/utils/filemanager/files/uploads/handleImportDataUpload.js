export function handleImportDataUpload(f1, f2) {
    f1.name = f2.name;
    f1.thumbnail = f2.thumbnail;
    f1.info = f2.info;
    f1.sizes = f2.sizes;
    f1.datecreated = f2.datecreated;
    f1.length = f2.length;
    f1.upload = f2.upload;
    f1.active = f2.active;
    f1.type = f2.type;
}