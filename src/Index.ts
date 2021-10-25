import { View, Types, $size_of, StructArray } from "./HyperFast";


const hero_meta = View.create_meta({
    x: Types.f32,
    y: Types.f32,
    hp: Types.i32
});

const matrix16_meta = View.create_meta({
    [$size_of]: 16,
    data: Types.f32
});


const [hero, hero_arr] = StructArray.create(hero_meta, 50);
const [mat, mat_arr] = StructArray.create(matrix16_meta, 50);



// //https://jsben.ch/7fhtA

// for(let i=0; i < 51; i++){
//     hero_arr.push({
//         hp: 100,
//         x: 10,
//         y: 20
//     });
// }

// for(let i=0; i < hero_arr.iterate_length; i += hero_arr.iterate_step){
//     console.log(`hp: ${hero.hp[i]} x: ${hero.x[i]} y: ${hero.y[i]}`)
// }

// hero_arr.reset();
// for(let i=0; i < 50; i++){
//     let index = hero_arr.add_one();
//     hero.hp[index] = 100;
//     hero.x[index] = 10;
//     hero.y[index] = 20;
// }

// for(let i=0; i < hero_arr.iterate_length; i += hero_arr.iterate_step){
//     console.log(`hp: ${hero.hp[i]} x: ${hero.x[i]} y: ${hero.y[i]}`)
// }

// console.log(hero_arr);