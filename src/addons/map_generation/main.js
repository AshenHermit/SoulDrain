
this.generation_pass = function(chunk){
    var new_data = chunk.copy_data()

    chunk.for_each((x, y, v)=>{
        let neighbours = 0

        neighbours += Math.min(1, chunk.get_block_id(x+1, y))
        neighbours += Math.min(1, chunk.get_block_id(x-1, y))
        neighbours += Math.min(1, chunk.get_block_id(x, y+1))
        neighbours += Math.min(1, chunk.get_block_id(x, y-1))

        neighbours += Math.min(1, chunk.get_block_id(x+1, y+1))
        neighbours += Math.min(1, chunk.get_block_id(x-1, y+1))
        neighbours += Math.min(1, chunk.get_block_id(x+1, y-1))
        neighbours += Math.min(1, chunk.get_block_id(x-1, y-1))

        if(v>0){
            if(neighbours < 3){
                new_data[x][y] = 0
            }
        }else{
            if(neighbours > 4){
                new_data[x][y] = world.map.key_to_block_id["wooden_wall"]
            }
        }
    })

    chunk.data = new_data
}

this.init = function(){
    world.map.register_block("wooden_wall", "wooden_wall")
    
    if(is_server){
        world.map.chunk_size = 64
        world.map.chunks.push(new Chunk(world.map.chunk_size, world.map.chunk_size, world.map))

        world.map.chunks[0].for_each((x, y, v)=>{
            if(Math.random() < 0.4){
                world.map.chunks[0].set_block_by_key(x, y, "wooden_wall")
            }
        })

        for (let i = 0; i < 8; i++) {
            this.generation_pass(world.map.chunks[0])   
        }

        world.map.chunks[0].for_each((x, y, v)=>{
            if(v==0){
                world.local_player.position.x = x * world.map.cell_size
                world.local_player.position.y = y * world.map.cell_size
                return true
            }
        })
    }
}