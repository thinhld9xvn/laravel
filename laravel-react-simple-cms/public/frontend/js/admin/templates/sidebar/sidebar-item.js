import React from 'react'
import { Link, withRouter  } from "react-router-dom";
export default function SidebarItem({ item, index, props }) {
    const {handleClickMenuItemToggle} = props
    const temp_subitems = item.hasChildrens ?
                            item.childrens.map((subitem, k) => <SidebarItem item = {subitem} 
                                                                            key = {subitem.id}
                                                                            index = {k}
                                                                            props = {props} />) : null;
    return (
        <li key={item.id} className={"nav-item ".concat(item.hasChildrens ? "has-sub" : "")
                                                .concat(item.is_active ? " active" : "")}
            onClick={handleClickMenuItemToggle}>
            <Link className="nav-link"
                to={item.url}
                data-key-item={item.id}>
                <i className="material-icons">{item.icon}</i>
                <p>{item.text}</p>
                {item.hasChildrens ? (
                    <i className="material-icons expand">{item.is_expand ? "remove_circle_outline" : "add_circle_outline"}</i>
                ) : null}
            </Link>
            {
                item.hasChildrens ? (
                    <ul className={"sub-childrens ".concat(item.is_expand ? "show" : "")}>
                        {temp_subitems}
                    </ul>
                ) : null
            }
        </li>
    )
}
