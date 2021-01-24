function create_map(width, height){
    var data = []
    for(let x=0; x<width; x++){
        data.push([])
        for(let y=0; y<height; y++){
            data[x].push([])
            data[x][y] = 0
        }
    }
    return data;
}

class Map{
    constructor(){
        this.chunk_size = 32
        this.cell_size = 32
        this.chunks = []
        //this.chunks.push(new Chunk(this.chunk_size, this.chunk_size, this))

        this.key_to_block_id = {}
        this.block_id_to_key = {}
        this.block_id_to_texture = {}
        this.next_block_id = 2;

    }

    register_block(key, texture_key){
        this.block_id_to_texture[this.next_block_id] = resources.textures[texture_key];
        this.block_id_to_key[this.next_block_id] = key
        this.key_to_block_id[key] = this.next_block_id
        this.next_block_id+=1
    }

    get_chunks_copy(){
        let copy = []
        for (let i = 0; i < this.chunks.length; i++) {
            copy.push({
                position_x: this.chunks[i].position.x,
                position_y: this.chunks[i].position.y,
                data: this.chunks[i].data,
            })
        }
        return copy
    }
    load_chunks_from_copy(copy){
        this.chunks = []
        for (let i = 0; i < copy.length; i++) {
            let new_chunk = new Chunk(this.chunk_size, this.chunk_size, this)
            new_chunk.position = vector2(copy[i].position_x, copy[i].position_y)
            new_chunk.data = copy[i].data
            this.chunks.push(new_chunk)
        }
    }

    draw(){
        for (let i = 0; i < this.chunks.length; i++) {
            this.chunks[i].for_each((x, y, v)=>{
                if(v>1){
                    ctx.image(this.block_id_to_texture[v], x*this.cell_size, y*this.cell_size)
                }
            })
        }
    }
}

class Chunk{
    constructor(width, height, parent_map){
        this.position = vector2();
        this.width = width
        this.height = height
        
        this.data = null
        this.parent_map = parent_map

        // init
        this.init()
    }
    init(){
        this.create(this.width, this.height)
    }
    create(width, height){
        this.width = width
        this.height = height
        
        this.data = create_map(width, height)
    }

    for_each(func){
        for(let x=0; x < this.width; x++){
            for(let y=0; y < this.height; y++){
                func(x, y, this.data[x][y])
            }
        }
    }

    valid_pos(x, y){
        return !(x<0 || y<0 || x>=this.width || y>=this.height)
    }
    set_block_by_key(x, y, key){
        this.set_block(x, y, this.parent_map.key_to_block_id[key])
    }
    set_block(x, y, id){
        if (this.valid_pos(x, y)){
            this.data[x][y] = id
        }
    }

    get_block_key(x, y){
        if (this.valid_pos(x, y)){
            return this.parent_map.block_id_to_key[this.data[x][y]]
        }else{
            return ""
        }
    }
    
    get_block_id(x, y){
        if (this.valid_pos(x, y)){
            return this.data[x][y]
        }else{
            return 0
        }
    }

}