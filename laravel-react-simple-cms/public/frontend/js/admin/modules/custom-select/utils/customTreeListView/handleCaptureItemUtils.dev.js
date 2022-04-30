"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCaptureItem = handleCaptureItem;

function handleCaptureItem(e) {
  e.preventDefault();
  e.target.classList.add('dragover');
}