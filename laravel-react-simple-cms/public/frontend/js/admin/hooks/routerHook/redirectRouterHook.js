import { ACTIONS_HOOKS } from 'constants/globalConstants';
import { redirectToEditPost } from './redirectRouterHook/redirectToEditPost'
export function redirectRouterHook(props) {
    const {actions, data} = props;
    const {from, to} = actions;    
    if ( to === ACTIONS_HOOKS.EDIT_POST ) {
        const {id} = data;
        redirectToEditPost(id);
    }
}