import { $bytes, $size_of } from "./symbols";
export declare type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor;
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
export declare type TypedArrayConstructor8 = Int8ArrayConstructor | Uint8ArrayConstructor;
export declare type TypedArrayConstructor16 = Int16ArrayConstructor | Uint16ArrayConstructor;
export declare type TypedArrayConstructor32 = Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor;
export declare type TypedArrayConstructor64 = Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor;
export declare type view_constructor8 = {
    [key: string]: TypedArrayConstructor8;
};
export declare type view_constructor16 = {
    [key: string]: TypedArrayConstructor16;
};
export declare type view_constructor32 = {
    [key: string]: TypedArrayConstructor32;
};
export declare type view_constructor64 = {
    [key: string]: TypedArrayConstructor64;
};
export declare type view_constructor = view_constructor8 | view_constructor16 | view_constructor32 | view_constructor64;
export declare type component_buffers<T> = {
    [key in keyof T]: InstanceType<T[key]>;
};
export declare type component_buffers_constructor<T> = {
    [key in keyof T]: T[key];
};
export declare type component_entry<T> = {
    [key in keyof T]: number;
};
export declare type view_attached<T> = component_buffers<T> & {
    [$size_of]: number;
    [$bytes]: number;
};
export declare type view_unattached<T> = component_buffers_constructor<T> & {
    [$size_of]: number;
    [$bytes]: number;
};
export declare const Types: {
    i8: Int8ArrayConstructor;
    u8: Uint8ArrayConstructor;
    i16: Int16ArrayConstructor;
    u16: Uint16ArrayConstructor;
    i32: Int32ArrayConstructor;
    u32: Uint32ArrayConstructor;
    f32: Float32ArrayConstructor;
    f64: Float64ArrayConstructor;
    i64: BigInt64ArrayConstructor;
    u64: BigUint64ArrayConstructor;
};
//# sourceMappingURL=types.d.ts.map