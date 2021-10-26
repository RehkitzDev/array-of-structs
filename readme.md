# Array of Structs (AoS)

Typescript library for buffer backed array of structs.

-supports SharedArrayBuffers.

## Installation

```bash
npm i array-of-structs
```

## Usage

full example with iteration over elements:
```javascript
const pos_meta = View.create_meta({
    x: Types.f32, 
    y: Types.f32
});

const [pos_view, pos_arr] = ArrayStruct.create(pos_meta);

//sets elements
for(let i=0; i < 100; i++){
    let index = pos_arr.add_one();
    pos_view.x[index] = 10;
    pos_view.y[index] = 20;
}

//iterating over elements. iterate attributes are important
for(let i=0; i < pos_arr.iterate_length; i += pos_arr.iterate_step){
    console.log(`x: ${pos_view.x[i]} y: ${pos_view.y[i]}`);
}


//important: the fith element gets replaces with the last element in array
pos_arr.delete(5);

```

create meta object descriptions (attributes need same byte sizes):
```javascript
const player_meta = View.create_meta({
    x: Types.f32,
    y: Types.f32,
    hp: Types.i32
});
```

attach view to any Arraybuffer / Sharedarraybuffer:
```javascript
const player_view = View.attach_meta(player_meta, new ArrayBuffer(1000));
//sets index 5
player_view.hp[5 * player_view[$size_of]] = 100;
player_view.x[5 * player_view[$size_of]] = 10;
player_view.y[5 * player_view[$size_of]] = 20;

```

create auto growing array of structs:
```javascript
//creates array with 50 elements
const [player_view, player_arr] = ArrayStruct.create(player_meta, 50);
```

add elements with objects or per indicies (creation per indicies is around 3x faster: https://jsben.ch/7fhtA):
```javascript
//fast
for(let i=0; i < 100; i++){
    let index = player_arr.add_one();
    player_view.hp[index] = 100;
    player_view.x[index] = 10;
    player_view.y[index] = 20;
}

//slow
for(let i=0; i < 100; i++){
    player_arr.push({
        hp: 100,
        x: 10,
        y: 20
    });
}
```