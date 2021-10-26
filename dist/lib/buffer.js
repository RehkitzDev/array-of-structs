const use_shared_array_buffer = typeof SharedArrayBuffer === undefined;
export function create_buffer(byte_length) {
    let buffer;
    if (use_shared_array_buffer) {
        buffer = new SharedArrayBuffer(byte_length);
    }
    else
        buffer = new ArrayBuffer(byte_length);
    return buffer;
}
export function grow_buffer(buffer) {
    let new_buffer;
    if (use_shared_array_buffer) {
        new_buffer = new SharedArrayBuffer(buffer.byteLength * 2);
    }
    else
        new_buffer = new ArrayBuffer(buffer.byteLength * 2);
    let to = new Uint8Array(new_buffer);
    let from = new Uint8Array(buffer);
    to.set(from);
    return new_buffer;
}
//# sourceMappingURL=buffer.js.map