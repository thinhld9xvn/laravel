import React, {useEffect} from 'react';
import { convertFileSize, isImageType } from 'utils/filemanager/fileUtils';
const MAX_LENGTH_IMAGE = 15;
const MAX_LENGTH_NOTIMAGE = 42;
function TemplateImageSizeOption({ data }) {
    const {value, name, size} = data;
    return (
        <option key={value} value={value}>{name} ({size[0]}x{size[1]})</option>
    );
}
function FileImageSizesSelect({ sizes }) {
    const data = [];
    const keys = Object.keys(sizes);
    for(let i = 0; i < keys.length; i++) {
        const value = keys[i].toString();
        const name = value[0].toUpperCase() + value.substr(1);
        const size = sizes[value];
        data.push(<TemplateImageSizeOption key = {value} data = {{value, name, size}} />);
    }
    return (
        <>
            {data}
        </>        
    )
}
export default function FileIToolbar({ data, parent, show, handleMouseDown, handleClose }) {    
    if ( !data ) return <></>;
    const {name, sizes, type, length, upload} = data;
    if ( !upload || upload.stat ) return <></>;
    const {label} = type;
    const fileSize = convertFileSize(length);
    const max_length = isImageType(data) ? MAX_LENGTH_IMAGE : MAX_LENGTH_NOTIMAGE;
    const fn = name.length > max_length ? name.substr(0, max_length - 3) + '...' : name;
    const arrFsData = isImageType(data) ? <FileImageSizesSelect sizes={sizes} /> : null;
    const handleSelectChanged = (e) => {
        parent.setState({
            embbedChooseSize : e.currentTarget.value
        });
    }   
    useEffect(() => {
        if ( data && isImageType(data) ) {
            setTimeout(() => {
                const sl = document.getElementById('slInfileSizes');
                if ( sl ) {
                    const keys = Object.keys(sizes);
                    const v = keys.length ? keys[0].toString() : '';
                    sl.value = v;
                    parent.setState({
                        embbedChooseSize : v
                    });
                }
            }, 200);
        }
    }, [data]);        
  return (
    <div id="popup-infile" className={show ? '' : 'none'}
          onMouseDown={handleMouseDown}>
        <div className="popup-wrapper">
            <div className="field">
                <label>Tên:</label>
                <div className="field-input padLeft5">{fn}</div>
            </div>
            {arrFsData ? (
                <div className="field">
                    <label>Kích thước:</label>
                    <div className="field-input padLeft5">
                        <select id="slInfileSizes" 
                                className="form-control infile-control"
                                onChange={handleSelectChanged}>
                            {arrFsData}
                        </select>
                    </div>
                </div>
            ) : null}
            <div className="field">
                <label>Dung lượng:</label>
                <div className="field-input padLeft5">{fileSize.size}{fileSize.unit}</div>
            </div>
            <div className="field">
                <label>Thể loại:</label>
                <div className="field-input padLeft5">{label}</div>
            </div>
        </div>
        <a href="#" className="close-button" onClick={handleClose}>x</a>
    </div>
  );
}
