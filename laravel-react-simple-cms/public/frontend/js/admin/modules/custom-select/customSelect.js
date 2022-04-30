import React, { Component } from 'react';
import './css/style.css';
import { handleOpen } from './utils/customSelect/handleOpenUtils';
import { handleOutsideClick } from './utils/customSelect/handleOutsideClickUtils';
import { handleSelect } from './utils/customSelect/handleSelectUtils';
class CustomSelect extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            defaultValue: '',
            defaultName: '',
            data : props.data,
            scrollTop : 0,            
            isOpen: false
        };
    }
    componentDidMount() {        
        const { data } = this.state;
        data.map((item, i) => {
            if ( item.selected ) {
                this.setState({
                    defaultName : item.name,
                    defaultValue : item.value
                });
            }
        });   
        document.addEventListener('mouseup', handleOutsideClick.bind(this));     
    }
    componentWillUnmount() {
        document.removeEventListener('mouseup', handleOutsideClick.bind(this));
    } 
   render() {
        const { placeholder } = this.props,
              { defaultName, data, isOpen } = this.state,
              select_lists = [];
        data.map((item, index) => {            
            select_lists.push(
                <div
                    key={index}
                    onClick={handleSelect.bind(this, item.value, item.name)}
                    className={'select-item'.concat(item['selected'] ? ' selected' : '')}>
                    <span className='select-title'>{item.name}</span>
                </div>
            )
        });     
        return (
            <div className={"option-custom option-select-custom ".concat(isOpen ? 'show' : '')}>
                <div className='select-input' 
                    onClick={handleOpen.bind(this)}>
                    <span className={`${placeholder && defaultName==='' ? 'select-title placeholder' : 'select-title'}`}>
                        {defaultName === '' ? placeholder : defaultName}
                    </span>
                </div>
                <div className={'select-list '.concat(isOpen ? 'show' : '')}>
                     {isOpen ? select_lists : null}
                </div>
            </div>
        );
    }
}
 export default CustomSelect;