import { POST_ACTIONS } from "constants/globalConstants";
import { handleRemovePostTypeCallback } from "./handleRemovePostTypeCallback";
import { removePostTypeHook } from 'hooks/postTypeHook/removePostTypeHook';
//
export function handleRemovePermantlyPostTypeCallback(pids) {
    handleRemovePostTypeCallback.call(this, pids, POST_ACTIONS.remove_permantly, removePostTypeHook);
}