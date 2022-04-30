import { handleChooseItem } from "./handleChooseItemUtils";
export function setValue(n, v) {
    const {parent, variableReturn} = this.props;
    handleChooseItem.call(this, v);
    this.setState({
        defaultValue: v,
        defaultName: n
    });     
    if ( parent && variableReturn ) {
        this.props.parent[variableReturn] = v;            
    }     
}