import { $bytes, $size_of } from "./symbols";
export function create_meta(obj) {
    let return_obj = { [$size_of]: 0, [$bytes]: 0 };
    let i = 0;
    for (const key in obj) {
        //@ts-ignore
        return_obj[key] = obj[key];
        return_obj[$size_of]++;
        return_obj[$bytes] += obj[key].BYTES_PER_ELEMENT;
        i++;
    }
    //@ts-ignore
    return return_obj;
}
export function attach_meta(view_meta, buffer) {
    let attached_view = {};
    Object.assign(attached_view, view_meta);
    let i = 0;
    for (const key in view_meta) {
        //@ts-ignore
        attached_view[key] = new view_meta[key](buffer, i * view_meta[key].BYTES_PER_ELEMENT);
        i++;
    }
    //@ts-ignore
    return attached_view;
}
export function update(view, buffer) {
    let i = 0;
    for (let key in view) {
        view[key] = new view[key].constructor(buffer, i * view[key].BYTES_PER_ELEMENT);
        i++;
    }
    return view;
}
//# sourceMappingURL=view.js.map