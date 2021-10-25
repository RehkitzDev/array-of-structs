import * as Buffer from "./buffer";
import * as View from "./view";
import * as Types from "./types";
import * as Symbols from "./symbols";
import { $size_of } from ".";


export function create<T>(component: Types.view_unattached<T>, length: number = 0): [Types.view_attached<T>, StructArray<T>]{
    let arr = new StructArray(component, length);
    return [arr.accessor, arr];
}

const BUFFER_STARTING_SIZE = 16_384;
export class StructArray<T>{
    //current_length, max_length
    private _buffer_info: Int32Array;
    private _buffer: ArrayBuffer | SharedArrayBuffer;
    public accessor: Types.view_attached<T>;

    constructor(component: Types.view_unattached<T>, length: number = 0){
        this._buffer_info = new Int32Array(Buffer.create_buffer(2 * 4));
        let byte_length = length == 0 ? BUFFER_STARTING_SIZE : component[Symbols.$bytes] * (length + 1);
        this._buffer = Buffer.create_buffer(byte_length);

        this.accessor = View.attach_meta(component, this._buffer);
        this.max_length = Math.floor(this._buffer.byteLength / this.accessor[Symbols.$bytes]);
        this.current_length = 0;
    }   

    public add_one(): number{
        if(1 * this.accessor[Symbols.$bytes] + this.current_length * this.accessor[Symbols.$bytes] >= this.max_length * this.accessor[Symbols.$bytes]){
            console.warn("struct array needs to grow");
            this._buffer = Buffer.grow_buffer(this._buffer);
            this.accessor = View.update(this.accessor, this._buffer);
            this.max_length = Math.floor(this._buffer.byteLength / this.accessor[Symbols.$bytes]);
        }

        this.current_length++;
        return (this.current_length-1) * this.accessor[Symbols.$size_of];
    }

    public push(obj: Types.component_entry<T>){
        let index = this.add_one();
        for (const key in obj) {
            this.accessor[key][index] = obj[key];
        }
    }

    public delete(byte_index: number){
        if(this.current_length == 0){
            return;
        }

        let last_index = (this.current_length-1) * this.accessor[Symbols.$size_of];
        let copied = 0;
        let accessor;
        for(const key in this.accessor){
            this.accessor[key][byte_index] = this.accessor[key][last_index];
            accessor = this.accessor[key];
            copied++;
        }

        //if object has greater size than attributes
        for(let i=copied; i < this.accessor[$size_of]; i++){
            accessor[byte_index + i] = accessor[last_index + i];
        }

        this.current_length--;
    }

    public reset(){
        this.current_length = 0;
    }

    get iterate_length(): number{
        return this._buffer_info[0] * this.accessor[Symbols.$size_of];
    }

    get iterate_step(): number{
        return this.accessor[Symbols.$size_of];
    }

    get current_length(): number{
        return this._buffer_info[0];
    }

    get max_length(): number{
        return this._buffer_info[1];
    }

    private set current_length(val: number){
        this._buffer_info[0] = val;
    }

    private set max_length(val: number){
        this._buffer_info[1] = val;
    }
}