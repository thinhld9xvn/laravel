import { cloneDeep, isEqual } from 'lodash';
import React, { Component } from 'react';
import './css/treelist.css';
import { getListItem } from './utils/customTreeListSelect/getListItemUtils';
import { handleHideItem } from './utils/customTreeListSelect/handleHideItemUtils';
import { handleOpen } from './utils/customTreeListSelect/handleOpenUtils';
import { handleOutsideClick } from './utils/customTreeListSelect/handleOutsideClickUtils';
import { setInitStateSelectedItems } from './utils/customTreeListSelect/setInitStateSelectedItemsUtils';
import { setValue as handleSetValue } from './utils/customTreeListSelect/setValueUtils';
import { handleSearchChanged } from './utils/customTreeListSelect/handleSearchChangedUtils';
import { isUndefined } from 'utils/libUtils';
class CustomTreeListSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: '',
            defaultName: '',
            data : [],
            filteredItems : [],
            searchText: '',
            enabled : true,
            scrollTop : 0,
            showSearch : !isUndefined(props.showSearch) ? props.showSearch : true,
            isOpen: false
        };
        this.disableHandleOutsideClick = false;
        this.props.parent[this.props.componentInst] = this;
    }
    componentDidMount() {  
        const {data : dataProps} = this.props; 
        const data = cloneDeep(dataProps);
        const filteredItems = cloneDeep(dataProps);
        this.setState({ data : cloneDeep(data), 
                        filteredItems : cloneDeep(filteredItems) }, () => {
            setInitStateSelectedItems.call(this, data);
        });
        document.addEventListener('mouseup', handleOutsideClick.bind(this));
    }   
    componentDidUpdate(previousProps, previousState) {
        const {searchText, showSearch} = this.state;
        const {data : dataProps, showSearch : showSearchProps} = this.props;
        if ( !isEqual(previousProps.data, dataProps) ) { 
            if ( !searchText ) {  
                const data = cloneDeep(dataProps);
                const filteredItems = cloneDeep(dataProps);
                this.setState({ data : cloneDeep(data), 
                                filteredItems : cloneDeep(filteredItems) }, () => {
                    setInitStateSelectedItems.call(this, data);
                });   
            }
        } 
        if ( showSearchProps && !isEqual(showSearch, showSearchProps) ) {
            this.setState({ showSearch : showSearchProps });
        }
    }
    componentWillUnmount() {
        document.removeEventListener('mouseup', handleOutsideClick.bind(this));
    }
    setValue(n, v) {   
        handleSetValue.call(this, n, v);
    }
    setHideItem(v) {
        handleHideItem.call(this, v);
    }
    setStateDisabled(v) {
        this.setState({ enabled : ! v });
    }
    
    render() {
        const { placeholder, className } = this.props,
              { defaultName, data, enabled, isOpen, filteredItems, searchText, showSearch } = this.state,
              select_lists = !searchText ? data.map(getListItem.bind(this)) : filteredItems.map(getListItem.bind(this));
        return (
            <div className={"option-custom option-custom-tree-list-select ".concat(className || ' ',
                                                    isOpen ? ' open' : '')}>
                <div className={'select-input '.concat(! enabled ? 'disabled' : '')}
                    onClick={handleOpen.bind(this)}> 
                    <span className={`${placeholder && defaultName==='' ? 'select-title placeholder' : 'select-title'}`}>
                        {defaultName === '' ? placeholder : defaultName}
                    </span>                    
                </div>
                {isOpen && showSearch ? (
                    <div className='select-search'>
                        <input type="search" 
                                className="categoryFlSearch"
                                placeholder="Tìm kiếm ..." 
                                value={searchText}
                                onChange={handleSearchChanged.bind(this)} />
                    </div>
                ) : null}
                <ul className={"select-list custom-tree-list-select __listselect ".concat(isOpen ? 'open' : '')}>
                    {isOpen ? select_lists : null}
                </ul>
            </div>
        );
    }
}
export default CustomTreeListSelect;