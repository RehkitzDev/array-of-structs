import * as Types from "./types";
export declare function create<T>(component: Types.view_unattached<T>, length?: number): [Types.view_attached<T>, ArrayStruct<T>];
export declare class ArrayStruct<T> {
    private _buffer_info;
    private _buffer;
    accessor: Types.view_attached<T>;
    constructor(component: Types.view_unattached<T>, length?: number);
    add_one(): number;
    push(obj: Types.component_entry<T>): void;
    delete(index: number): void;
    reset(): void;
    get iterate_length(): number;
    get iterate_step(): number;
    get current_length(): number;
    get max_length(): number;
    private set current_length(value);
    private set max_length(value);
}
//# sourceMappingURL=array_struct.d.ts.map