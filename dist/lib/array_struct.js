import * as Buffer from "./buffer";
import * as View from "./view";
import * as Symbols from "./symbols";
export function create(component, length = 0) {
    let arr = new ArrayStruct(component, length);
    return [arr.accessor, arr];
}
const BUFFER_STARTING_SIZE = 16_384;
export class ArrayStruct {
    //current_length, max_length
    _buffer_info;
    _buffer;
    accessor;
    constructor(component, length = 0) {
        this._buffer_info = new Int32Array(Buffer.create_buffer(2 * 4));
        let byte_length = length == 0 ? BUFFER_STARTING_SIZE : component[Symbols.$bytes] * (length + 1);
        this._buffer = Buffer.create_buffer(byte_length);
        this.accessor = View.attach_meta(component, this._buffer);
        this.max_length = Math.floor(this._buffer.byteLength / this.accessor[Symbols.$bytes]);
        this.current_length = 0;
    }
    add_one() {
        if (1 * this.accessor[Symbols.$bytes] + this.current_length * this.accessor[Symbols.$bytes] >= this.max_length * this.accessor[Symbols.$bytes]) {
            console.warn("array struct needs to grow");
            this._buffer = Buffer.grow_buffer(this._buffer);
            this.accessor = View.update(this.accessor, this._buffer);
            this.max_length = Math.floor(this._buffer.byteLength / this.accessor[Symbols.$bytes]);
        }
        this.current_length++;
        return (this.current_length - 1) * this.accessor[Symbols.$size_of];
    }
    push(obj) {
        let index = this.add_one();
        for (const key in obj) {
            this.accessor[key][index] = obj[key];
        }
    }
    delete(index) {
        if (this.current_length == 0) {
            return;
        }
        index *= this.accessor[Symbols.$size_of];
        let last_index = (this.current_length - 1) * this.accessor[Symbols.$size_of];
        for (const key in this.accessor) {
            this.accessor[key][index] = this.accessor[key][last_index];
        }
        this.current_length--;
    }
    reset() {
        this.current_length = 0;
    }
    get iterate_length() {
        return this._buffer_info[0] * this.accessor[Symbols.$size_of];
    }
    get iterate_step() {
        return this.accessor[Symbols.$size_of];
    }
    get current_length() {
        return this._buffer_info[0];
    }
    get max_length() {
        return this._buffer_info[1];
    }
    set current_length(val) {
        this._buffer_info[0] = val;
    }
    set max_length(val) {
        this._buffer_info[1] = val;
    }
}
//# sourceMappingURL=array_struct.js.map