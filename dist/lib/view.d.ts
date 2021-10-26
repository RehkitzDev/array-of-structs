import { view_attached, view_constructor, view_unattached } from "./types";
export declare function create_meta<T extends view_constructor>(obj: T): view_unattached<T>;
export declare function attach_meta<T extends view_unattached<T>>(view_meta: T, buffer: ArrayBuffer | SharedArrayBuffer): view_attached<T>;
export declare function update<T>(view: view_attached<T>, buffer: ArrayBuffer | SharedArrayBuffer): view_attached<T>;
//# sourceMappingURL=view.d.ts.map