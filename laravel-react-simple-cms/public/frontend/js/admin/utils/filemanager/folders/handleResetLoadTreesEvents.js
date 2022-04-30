import { handleRemoveFile } from "../files/handleRemoveFile";

export function handleResetLoadTreesEvents() {
    document.removeEventListener('keydown', handleRemoveFile);
}