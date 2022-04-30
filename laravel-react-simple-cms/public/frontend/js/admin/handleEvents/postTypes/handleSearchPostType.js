import {cloneDeep} from 'lodash';

export function handleSearchPostType(e) {
    const keyCode = e.which || e.keyCode;
    const {s, data} = this.state;
    const {postTypesList} = this.props;
    const lowerSearchKey = s.toLowerCase();
    if ( keyCode === 13 ) {
        if ( !s ) {
            this.setState({
                filteredItems : cloneDeep(data)
            });
            return;
        }
        const results = postTypesList.filter(pt => pt.name.toLowerCase().indexOf(lowerSearchKey) !== -1);
        this.setState({
            filteredItems : cloneDeep(results)
        });
    }
}