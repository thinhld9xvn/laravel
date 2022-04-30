"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleLeaveCaptureItem = handleLeaveCaptureItem;

function handleLeaveCaptureItem(e) {
  e.preventDefault();
  e.target.classList.remove('dragover');
}