import { performUsersTabDidMountHook } from "utils/membershipUtils";
export async function handleRefreshUsersListData() {
    await performUsersTabDidMountHook();
}