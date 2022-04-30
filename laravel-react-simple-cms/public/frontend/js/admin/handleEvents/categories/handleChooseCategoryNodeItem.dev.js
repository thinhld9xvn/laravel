"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleChooseCategoryNodeItem = handleChooseCategoryNodeItem;

var _categoryPostTypesUtils = require("utils/categoryPostTypesUtils");

var _lodash = require("lodash");

function handleChooseCategoryNodeItem(v) {
  var categoriesData = this.state.categoriesData;
  var resultNode = (0, _categoryPostTypesUtils.todoSearchCategoryNode)(categoriesData, v);
  this.props.updateActiveCategoryNode(resultNode ? (0, _lodash.cloneDeep)(resultNode) : null);
  this.setState({
    categoryNodeSelectedValue: v
  });
}