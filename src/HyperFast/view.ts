import { $bytes, $size_of } from "./symbols";
import { view_attached, view_constructor, view_unattached } from "./types";

export function create_meta<T extends view_constructor>(obj: T): view_unattached<T>{
    let return_obj = {[$size_of]: 0, [$bytes]: 0};

    let i=0;
    for(const key in obj){
        //@ts-ignore
        return_obj[key] = obj[key];
        return_obj[$size_of]++;
        return_obj[$bytes]+= obj[key].BYTES_PER_ELEMENT;
        i++;
    }

    //@ts-ignore
    if(obj[$size_of] != undefined){
        //@ts-ignore
        return_obj[$size_of] = obj[$size_of];
        return_obj[$bytes] = i * return_obj[$size_of];
    }
    //@ts-ignore
    return return_obj;
}

export function attach_meta<T extends view_unattached<T>>(view_meta: T, buffer: ArrayBuffer | SharedArrayBuffer): view_attached<T>{
    let attached_view = {};
    Object.assign(attached_view, view_meta);

    let i=0;
    for(const key in view_meta){
        //@ts-ignore
        attached_view[key] = new view_meta[key](buffer, i * view_meta[key].BYTES_PER_ELEMENT);
        i++;
    }
    //@ts-ignore
    return attached_view;
}

export function update<T>(view: view_attached<T>, buffer: ArrayBuffer | SharedArrayBuffer): view_attached<T>{
    let i=0;
    for(let key in view){
        view[key] = new view[key].constructor(buffer, i * view[key].BYTES_PER_ELEMENT);
        i++;
    }

    return view;
}