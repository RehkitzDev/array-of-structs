import { ArrayStruct, Types, View } from "../lib";
test("readme test", () => {
    const pos_meta = View.create_meta({
        x: Types.f32,
        y: Types.f32
    });
    const [pos_view, pos_arr] = ArrayStruct.create(pos_meta);
    //sets elements
    for (let i = 0; i < 100; i++) {
        let index = pos_arr.add_one();
        pos_view.x[index] = 1000 + i;
        pos_view.y[index] = 2000 + i;
    }
    expect(pos_view.x[0] == 1000);
    expect(pos_view.y[0] == 2000);
    expect(pos_view.x[2] == 1001);
    expect(pos_view.y[2] == 2001);
    //important: the fith element gets replaces with the last element in array
    pos_arr.delete(5);
    expect(pos_view.x[10] == 1100);
    expect(pos_view.y[10] == 2100);
});
//# sourceMappingURL=simple.test.js.map