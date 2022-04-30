import { getEditorImageSize, getEditorImageSrc, isImageType } from "utils/filemanager/fileUtils";
import React from 'react'
import ReactDOMServer from "react-dom/server";
export function handleInsertAttachment(files, props) {
    const objects = [];
    const {alt} = props;
    files.forEach(obj => {     
        const {url, name} = obj;
        let objTag = null; 
        if ( isImageType(obj) ) {   
            const tinySrc = getEditorImageSrc(obj),
                  {width, height} = getEditorImageSize(obj);
            objTag = <p>
                        <img src={tinySrc} width={width} height={height} alt={alt} />
                    </p>;
            objects.push(objTag);
        }
        else {
            objTag = <p>
                        <a title={name} href={url}>{name}</a>
                    </p>;
            objects.push(objTag);
        }
    });
    if ( document.activeTinyMceEditorId ) { 
        const t = tinymce.get(document.activeTinyMceEditorId);
        t.focus();
        t.insertContent(ReactDOMServer.renderToString(objects));
    }    
    else {
        tinymce.activeEditor.insertContent(ReactDOMServer.renderToString(objects));
    }
}