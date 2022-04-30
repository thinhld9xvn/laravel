"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleChooseObject = handleChooseObject;

var _componentConstants = require("constants/componentConstants");

var _globalConstants = require("constants/globalConstants");

var _componentUtils = require("utils/componentUtils");

var _fileUtils = require("utils/filemanager/fileUtils");

var _mediaEmbbedModalUtils = require("utils/filemanager/mediaEmbbedModalUtils");

var _handleInsertAttachment = require("./handleChooseObject/handleInsertAttachment");

var _handleAttachFeatureImage = require("./handleChooseObject/handleAttachFeatureImage");

var _handleChangeFeaturedImageCatObject = require("./handleChooseObject/handleChangeFeaturedImageCatObject");

var _modalUtils = require("utils/modalUtils");

function handleChooseObject(e) {
  e.preventDefault();

  var inst = (0, _componentUtils.getComponentInst)(_componentConstants.COMPONENT_INST.FILE_MANAGER),
      mediaPointerInst = document.mediaEmbbedModalPointer,
      formFields = mediaPointerInst.state.formFields,
      selected_files = _fileUtils.getSelectedFiles.call(inst),
      file = selected_files[0],
      src = file.thumbnail,
      info = file.info,
      isImage = (0, _fileUtils.isImageType)(file),
      alt = info.alt,
      pathname = (0, _fileUtils.getAttachmentPathFromUrl)(src, 'uploads');

  var command = document.mediaEmbbedModalCommand || _globalConstants.MEDIA_MODAL_COMMAND.insertAttachment; //

  if (!selected_files || !selected_files.length) return; //

  if (command === _globalConstants.MEDIA_MODAL_COMMAND.insertAttachment) {
    _handleInsertAttachment.handleInsertAttachment.call(this, selected_files, {
      alt: alt
    });
  }

  if (command === _globalConstants.MEDIA_MODAL_COMMAND.attachFeaturedImage) {
    var results = _handleAttachFeatureImage.handleAttachFeatureImage.call(this, {
      mediaPointerInst: mediaPointerInst,
      src: src,
      alt: alt,
      pathname: pathname,
      isImage: isImage
    });

    if (!results) {
      (0, _modalUtils.showAlertDialog)({
        title: 'Thông báo',
        message: 'Đây không phải là ảnh, mời chọn  một đối tượng khác !!!',
        icon: 'error',
        ok_label: 'Đồng ý',
        ok_callback: function ok_callback() {}
      });
      return false;
    }
  }

  if (command === _globalConstants.MEDIA_MODAL_COMMAND.changeFeaturedImageCatObject) {
    var _results = _handleChangeFeaturedImageCatObject.handleChangeFeaturedImageCatObject.call(this, {
      mediaPointerInst: mediaPointerInst,
      formFields: formFields,
      src: src,
      isImage: isImage
    });

    if (!_results) {
      (0, _modalUtils.showAlertDialog)({
        title: 'Thông báo',
        message: 'Đây không phải là ảnh, mời chọn  một đối tượng khác !!!',
        icon: 'error',
        ok_label: 'Đồng ý',
        ok_callback: function ok_callback() {}
      });
      return false;
    }
  }

  _mediaEmbbedModalUtils.closeMediaEmbbedModal.call(this);
}