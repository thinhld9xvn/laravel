import React, { Component } from 'react';
import './css/treelist.css';
import { getListItem } from './utils/customTreeList/getListItemUtils';
import { handleSearchChanged } from './utils/customTreeList/handleSearchChangedUtils';
import { cloneDeep, isEqual } from 'lodash';
import { handleInitNodesState } from './utils/customTreeList/nodes/handleInitNodesStateUtils';
import { isUndefined } from 'utils/libUtils';
class CustomTreeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin : [],
            data: [],
            filteredItems: [],
            searchText: '',
            coordsNodesList : []
        };
    }
    renderTreeList(data) {
        let d = cloneDeep(data),
            mapData = (item, i, parent) => {
                item.pending = false;
                item.parentValue = parent ? parent.value : null;
                item.childrens &&
                    item.childrens.map((_item, k) => mapData(_item, k, item));
            }
        d.map((item, i) => mapData(item, i, null));
        return d;
    }
    sortRenderedList(data) {
        const results = [];
        const parseNodeItem = (item) => {
            if ( item.childrens ) {
                item.childrens = [];
            }
            return item;
        }
        const searchParentElem = (v) => {
            let searched = null;
            const travselSearchItem = (item) => {
                if ( searched ) return;
                if ( item.value.toString().trim() === v.toString().trim() ) {
                    searched = item;
                }
                if ( item.childrens && item.childrens.length ) {
                    item.childrens.map(travselSearchItem);
                } 
            }
            results.map(travselSearchItem);
            if ( searched ) {
                if ( isUndefined(searched.childrens) || !Array.isArray(searched.childrens) ) {
                    searched.childrens = [];
                }
                return searched.childrens;
            }
            return null;
        }
        const travselSortItem = (item, parent = null) => {
            const resultsElem = !parent ? results : searchParentElem(parent.value);
            if ( item.pending || item.selected ) {
                if ( item.selected ) {
                    resultsElem.splice(0, 0, parseNodeItem(cloneDeep(item)));
                }
                else {
                    const topElem = resultsElem[0];
                    resultsElem.splice(topElem.selected ? 1 : 0, 0, parseNodeItem(cloneDeep(item)));
                }
            }
            else {
                resultsElem.push(parseNodeItem(cloneDeep(item)));
            }
            if ( item.childrens && item.childrens.length ) {
                item.childrens.map(citem => travselSortItem(citem, item));
            }
        }
        data.map(item => travselSortItem(item, null));
        return results;
    }
    componentDidMount() {
        const data = this.renderTreeList(this.props.data);
        this.setState({
            origin : cloneDeep(this.props.data),
            data: cloneDeep(data),
            filteredItems: cloneDeep(data)
        });
    }
    componentDidUpdate(nextProps, nextState) {
        const {origin} = this.state;
        const {data : myData} = this.props;
        if ( !isEqual(origin, myData) ) {
            const renderdList = this.renderTreeList(myData);
            const myRenderData = cloneDeep(renderdList);
            const {coordsNodesList} = handleInitNodesState(myRenderData);
            const sortedRenderData = this.sortRenderedList(myRenderData);
            this.setState({
                origin : cloneDeep(myData),
                data : cloneDeep(sortedRenderData),
                filteredItems : cloneDeep(sortedRenderData),
                coordsNodesList : cloneDeep(coordsNodesList)
            });            
        }
    }
    render() {
        const {filteredItems, searchText} = this.state;
        const select_lists = filteredItems.map((item, index) => getListItem.call(this, item, index));
        return (
            <div className='option-lists'>
                <ul className="select-list tree-list">
                    {select_lists}
                </ul>
                <div className="search">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-search"></i>
                        </span>
                        <input type="text"
                            className="form-control txtSearch"
                            value={searchText}
                            onChange={handleSearchChanged.bind(this)}
                            placeholder="Tìm kiếm danh mục ..." />
                    </div>
                </div>
            </div>
        );
    }
}
export default CustomTreeList;