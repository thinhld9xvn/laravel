import { getPostLayoutInst, initializePostLayout } from "utils/postTypesUtils";
export async function reMountWhenChangeRouteHook() {
    const inst = getPostLayoutInst();
    await initializePostLayout.call(inst, null, true);
}