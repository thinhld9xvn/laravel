import { cloneDeep, isEqual } from 'lodash';
import React, { Component } from 'react';
import './css/treelist.css';
import TemplateListItem from './utils/customTreeListView/templateListItem';
import { handleSetInitStateSelectedItems } from './utils/customTreeListView/handleSetInitStateSelectedItemsUtils';
import { handleTreeViewData } from './utils/customTreeListView/handleTreeViewDataUtils';
import { setValue as handleSetValue } from './utils/customTreeListView/setValueUtils';
import { isUndefined } from 'utils/libUtils';
class CustomTreeListView extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            defaultValue: '',
            defaultName: '',
            originData : [],
            data : [],
            showCheckboxes : false,
            scrollTop : 0,
            isOpen: false,
            draggable : !isUndefined(props.draggable) ? props.draggable : true
        };
        this.searchedNode = null;
        this.onAddEvent_handleOutsideClick = false;
        this.props.parent[this.props.componentInst] = this;
    }
    componentDidMount() {   
        const {data} = this.props;
        const myData = handleTreeViewData(cloneDeep(data));
        this.setState({ originData : cloneDeep(data),
                        data : cloneDeep(myData) }, () => {
            handleSetInitStateSelectedItems.call(this, data);
        });
    }   
    componentDidUpdate(previousProps, previousState) {   
        const {data, showCheckboxes, draggable} = this.props;
        const {showCheckboxes : showCheckboxesState, originData : dataState, draggable : draggableState} = this.state;
        if ( !isEqual(dataState, data) ) {
            const myData = handleTreeViewData(cloneDeep(data));
            this.setState({ originData : cloneDeep(data),
                            data : cloneDeep(myData) }, () => {
                handleSetInitStateSelectedItems.call(this, myData);
            });
        } 
        if ( showCheckboxes && !isEqual(showCheckboxesState, showCheckboxes) ) {
            this.setState({ showCheckboxes });
        }
        if ( draggable && !isEqual(draggableState, draggable) ) {
            this.setState({ draggable });
        }
    }
    setValue(n, v) {
        handleSetValue.call(this, n, v);
    }
   render() {
        const { className } = this.props,
              { data, showCheckboxes, draggable } = this.state,
              select_lists = data.map((item, index) => <TemplateListItem key = {item.value}
                                                                        inst = {this}
                                                                        item = {item}
                                                                        index = {index} 
                                                                        showCheckboxes = {showCheckboxes}
                                                                        draggable = {draggable} />);
        return (
            <div className={"option-custom mh100p-ms".concat(className || '')}>
                <ul className="select-list custom-tree-list-select __listview mh100p-ms open">
                    {select_lists.length ? (
                        <>
                            {select_lists}
                        </>
                    ) : (
                        <li className="empty">Không có dữ liệu nào ở đây ...</li>
                    )}
                </ul>
            </div>
        );
    }
}
 export default CustomTreeListView;